/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import type Reveal from 'reveal.js'
import { FirebaseApp } from 'firebase/app'
import type { DatabaseReference, DataSnapshot } from 'firebase/database'
import * as firebaseDatabase from 'firebase/database'
import { getAuth, User } from 'firebase/auth'

import type { DbPaths } from '../firebase'
import {
  showSyncButton,
  hideSyncButton,
  handleEnableSync,
  handleDisableSync,
  setViewerCount,
} from './handlers'
import { isNewDomain } from '../utils/url'

type RevealEvent = Parameters<Parameters<Reveal['addEventListener']>[1]>[0]

type Indices = {
  h: number
  v: number
  f?: number | null
}

enum State {
  OVERVIEW_SHOWN = 'overviewshown',
  OVERVIEW_HIDDEN = 'overviewhidden',
}

type PresentationStore = {
  state: State
  indices: Indices
  presenterUid: string | undefined
}

type Args = {
  app: FirebaseApp
  reveal: Reveal
  clientId: string
  presenterUids: string[]
  dbPaths: DbPaths
  onPresentationStart: (isPresenter: boolean) => void
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
  private onPresentationStart: Args['onPresentationStart']

  constructor({
    app,
    reveal,
    clientId,
    presenterUids,
    dbPaths,
    onPresentationStart,
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
    // Upgrade Reveal version - need to fork reveal-hugo
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

  public onPresenceCountChange = (count: number) => {
    console.log('count: ', count)
    setViewerCount(count)
  }

  private startSync = () => {
    this.isSynced = true
    this.explicitUnfollow = false
    handleEnableSync()
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
      } else if (this.isSynced) {
        this.updateSlides(this.presenterValues)
      }
    } else if (!this.isAuthorizedPresenter()) {
      this.endPresentation()
    }
  }

  private updateSlides = (values: PresentationStore) => {
    this.setSlideLocation(values.indices)
    this.setSlideState(values.state)
  }

  private getSnapshotValues = (
    snapshot: DataSnapshot
  ): PresentationStore | null | undefined =>
    snapshot.exists() ? (snapshot.val() as PresentationStore | null) : undefined

  private stopSync = (explicit = false) => {
    this.explicitUnfollow = explicit
    this.isSynced = false
    handleDisableSync()
  }

  private getState = (): State =>
    this.reveal.isOverview() ? State.OVERVIEW_SHOWN : State.OVERVIEW_HIDDEN

  private handleRevealEvent = (event?: RevealEvent) => {
    if (this.isAuthorizedPresenter()) {
      this.emitRevealAction(this.getState(), this.reveal.getIndices())
    } else {
      this.handleRoamingUser(event)
    }
  }

  /**
   * Magnetic follow - allow participants to roam and come back
   */
  private handleRoamingUser = (position?: {
    indexh: number
    indexv: number
  }) => {
    if (this.magneticTimeout) {
      window.clearTimeout(this.magneticTimeout)
    }
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
            position.indexh === this.presenterValues.indices.h &&
            position.indexv === this.presenterValues.indices.v
          ) {
            this.startSync()
          }
        }, this.magneticTimeoutTime)
      } else if (
        this.isSynced &&
        position &&
        (position.indexh !== this.presenterValues.indices.h ||
          position.indexv !== this.presenterValues.indices.v)
      ) {
        this.stopSync()
      }
    }
  }

  private setSlideState = (state: State) => {
    switch (state) {
      case State.OVERVIEW_SHOWN:
        if (!this.reveal.isOverview()) {
          this.reveal.toggleOverview(true)
        }
        break
      case State.OVERVIEW_HIDDEN:
        if (this.reveal.isOverview()) {
          this.reveal.toggleOverview(false)
        }
        break
    }
  }

  private setSlideLocation = (indices: Indices) => {
    if (!indices) {
      throw Error('Unable to identify indices from sync.')
    }
    this.reveal.slide(indices.h, indices.v, indices.f || undefined)
  }

  private emitRevealAction = (state: State, indices: Indices) => {
    const values: PresentationStore = {
      state,
      indices: {
        h: indices.h,
        v: indices.v,
        f: indices.f || null,
      },
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
