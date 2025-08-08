/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

import type { FirebaseApp } from 'firebase/app'
import { getAuth, type User } from 'firebase/auth'
import type { DatabaseReference, DataSnapshot } from 'firebase/database'
import * as firebaseDatabase from 'firebase/database'
import type Reveal from 'reveal.js'

import type { DbPaths } from '../firebase'
import { isNewDomain } from '../utils/url'
import {
  handleDisableSync,
  handleEnableSync,
  hideSyncButton,
  setupViewer,
  showSyncButton,
} from './handlers'

type RevealEvent = Parameters<Parameters<Reveal['addEventListener']>[1]>[0]

type Indices = {
  h: number
  v: number
  f?: number | null
}

const noop = () => {}

enum State {
  OVERVIEW_SHOWN = 'overviewshown',
  OVERVIEW_HIDDEN = 'overviewhidden',
}

type PresentationStore = {
  state: State
  indices: Indices
  autoSlide: boolean
  paused: boolean
  presenterUid: string | undefined
}

type Args = {
  app: FirebaseApp
  reveal: Reveal
  clientId: string
  presenterUids: string[]
  dbPaths: DbPaths
  onPresentationStart?: (isPresenter: boolean) => void
}

/**
 * TODO: sync pause state, prevent viewer unpause and remove resume button
 */
export class Sync {
  isSynced = false
  isActivePresentation = false
  clientId: string
  app: FirebaseApp
  reveal: Reveal
  presenterUids: string[]
  presenterValues?: PresentationStore | null
  explicitUnfollow = false
  private ref: DatabaseReference
  private magneticTimeout?: number
  private magneticTimeoutTime = 1000
  private onPresentationStart: (isPresenter: boolean) => void

  constructor({
    app,
    reveal,
    clientId,
    presenterUids,
    dbPaths,
    onPresentationStart = noop,
  }: Args) {
    this.app = app
    this.reveal = reveal
    this.presenterUids = presenterUids
    this.clientId = clientId
    this.onPresentationStart = onPresentationStart
    const db = firebaseDatabase.getDatabase(app)
    this.ref = firebaseDatabase.ref(db, dbPaths.presentation)

    getAuth(app).onAuthStateChanged((user: User | null) => {
      if (user) {
        this.handleRevealEvent()
        this.onPresentationStart(this.isAuthorizedPresenter())
      }
    })
    reveal.addEventListener('slidechanged', this.handleRevealEvent)
    reveal.addEventListener('fragmentshown', this.handleRevealEvent)
    reveal.addEventListener('fragmenthidden', this.handleRevealEvent)
    reveal.addEventListener('overviewhidden', this.handleRevealEvent)
    reveal.addEventListener('overviewshown', this.handleRevealEvent)
    reveal.addEventListener('autoslidepaused', this.handleRevealEvent)
    reveal.addEventListener('autoslideresumed', this.handleRevealEvent)
    reveal.addEventListener('paused', this.handleRevealEvent)
    reveal.addEventListener('resumed', this.handleRevealEvent)
    // Upgrade Reveal version - need to fork reveal-hugo - disallow skipping ahead of Math.max(h/v/f)
    // https://github.com/dzello/reveal-hugo/pull/115
    // reveal.addEventListener('beforeslidechange', (event) => {
    //   console.log('BEFORE CHANGE', event)
    // })

    window.addEventListener('beforeunload', () => {
      if (reveal && this.isAuthorizedPresenter()) {
        this.killPresentation()
      }
    })

    const isReady = reveal.getRevealElement().classList.contains('ready')
    if (isReady) {
      this.handleRevealReady()
    } else {
      reveal.addEventListener('ready', this.handleRevealReady)
    }

    firebaseDatabase.onValue(this.ref, this.handleServerChange)

    const sync = document.getElementById('sync') as HTMLButtonElement | null
    if (sync) {
      sync.addEventListener('click', () => {
        if (this.isSynced) {
          this.stopSync(true)
        } else {
          this.startSync()
        }
      })
    }

    this.startSync()
  }

  private startSync = () => {
    this.isSynced = true
    this.explicitUnfollow = false
    handleEnableSync()
    if (!this.isAuthorizedPresenter()) {
      this.updateSlides()
    }
  }

  /**
   * Server value change from presenter
   */
  private handleServerChange = (snapshot: DataSnapshot) => {
    const values = this.getSnapshotValues(snapshot)
    this.presenterValues = values
    if (this.presenterValues && !this.isAuthorizedPresenter()) {
      if (!this.isActivePresentation) {
        this.initializeViewerPresentation()
      }
      if (this.isSynced) {
        this.updateSlides()
      }
    } else if (!this.isAuthorizedPresenter()) {
      this.endPresentation()
    }
  }

  private updateSlides = (values = this.presenterValues) => {
    if (values && values.paused !== this.reveal.isPaused()) {
      this.reveal.togglePause(values.paused)
    }

    if (values && values.autoSlide !== this.reveal.isAutoSliding()) {
      this.reveal.toggleAutoSlide(values.autoSlide)
    }

    this.setSlideLocation(values?.indices)
    this.setSlideState(values?.state)
  }

  private getSnapshotValues = (
    snapshot: DataSnapshot,
  ): PresentationStore | null | undefined =>
    snapshot.exists() ? (snapshot.val() as PresentationStore | null) : undefined

  private stopSync = (explicit = false) => {
    this.explicitUnfollow = explicit
    this.isSynced = false
    handleDisableSync()
  }

  private getState = (): State =>
    this.reveal.isOverview() ? State.OVERVIEW_SHOWN : State.OVERVIEW_HIDDEN

  private handleRevealEvent = (_event?: RevealEvent) => {
    if (this.isAuthorizedPresenter()) {
      this.emitRevealAction(this.getState(), this.reveal.getIndices())
    } else {
      this.handleRoamingUser(this.reveal.getIndices())
    }
  }

  /**
   * Magnetic follow - allow participants to roam and come back
   */
  private handleRoamingUser = (position?: {
    h: number
    v: number
    f?: number
  }) => {
    if (this.magneticTimeout) {
      window.clearTimeout(this.magneticTimeout)
    }
    const autoSlide = this.reveal.isAutoSliding()
    const paused = this.reveal.isPaused()
    if (
      !this.explicitUnfollow &&
      this.presenterValues &&
      !this.isAuthorizedPresenter()
    ) {
      if (!this.isSynced) {
        this.magneticTimeout = window.setTimeout(() => {
          if (
            this.presenterValues &&
            this.presenterValues.state === State.OVERVIEW_HIDDEN &&
            position &&
            position.h === this.presenterValues.indices.h &&
            position.v === this.presenterValues.indices.v &&
            position.f === this.presenterValues.indices.f
          ) {
            this.startSync()
          }
        }, this.magneticTimeoutTime)
      } else if (
        (this.isSynced &&
          position &&
          (position.h !== this.presenterValues.indices.h ||
            position.v !== this.presenterValues.indices.v ||
            position.f !== this.presenterValues.indices.f)) ||
        autoSlide !== this.presenterValues.autoSlide ||
        paused !== this.presenterValues.paused
      ) {
        this.stopSync()
      }
    }
  }

  private setSlideState = (state?: State) => {
    switch (state) {
      case State.OVERVIEW_SHOWN:
        if (!this.reveal.isOverview()) {
          this.reveal.toggleOverview(true)
        }
        break
      case State.OVERVIEW_HIDDEN:
      default:
        if (this.reveal.isOverview()) {
          this.reveal.toggleOverview(false)
        }
        break
    }
  }

  private setSlideLocation = (indices: Indices = { h: 0, v: 0 }) => {
    this.reveal.slide(indices.h ?? 0, indices.v ?? 0, indices.f ?? undefined)
  }

  private emitRevealAction = (state: State, indices: Indices) => {
    const values: PresentationStore = {
      state,
      indices: {
        h: indices.h,
        v: indices.v,
        f: indices.f ?? null,
      },
      autoSlide: this.reveal.isAutoSliding(),
      paused: this.reveal.isPaused(),
      presenterUid: this.getActiveUser()?.uid,
    }
    void firebaseDatabase.set(this.ref, values)
  }

  private getActiveUser = (): User | null => getAuth(this.app).currentUser

  public isAuthorizedPresenter = (): boolean => {
    const currentUser = this.getActiveUser()
    return currentUser ? this.presenterUids.includes(currentUser.uid) : false
  }

  private initializeViewerPresentation = () => {
    if (!this.isAuthorizedPresenter()) {
      setupViewer(this.reveal)
      showSyncButton()
      this.isActivePresentation = true
      if (!this.isSynced) {
        this.startSync()
      }
    }
    this.onPresentationStart(this.isAuthorizedPresenter())
  }

  private killPresentation = () => {
    // event listeners should clean up themselves
    void firebaseDatabase.remove(this.ref)
  }

  private endPresentation = () => {
    this.isActivePresentation = false
    this.isSynced = false
    clearTimeout(this.magneticTimeout)
    hideSyncButton()
  }

  private handleRevealReady = () => {
    this.modifyExternalPresentationLinks()
  }

  /**
   * If link is not relative,
   * open it in a new tab and pause the presentation
   */
  private modifyExternalPresentationLinks = () => {
    Array.from(document.links).forEach((anchor) => {
      anchor.onclick = () => {
        if (isNewDomain(anchor.href) && this.isAuthorizedPresenter()) {
          if (!this.reveal.isPaused()) {
            this.reveal.togglePause()
          }
          window.open(anchor.href, '_blank')
          return false
        }

        return true
      }
    })
  }
}

export default (args: Args) => new Sync(args)
