/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { FirebaseApp } from 'firebase/app'
import type { DatabaseReference, DataSnapshot } from 'firebase/database'
import * as firebaseDatabase from 'firebase/database'
import type Reveal from 'reveal.js'
import { v4 as uuidv4 } from 'uuid'
import { getAuth, User } from 'firebase/auth'

import {
  showSyncButton,
  hideSyncButton,
  handleEnableSync,
  handleDisableSync,
} from './handlers'
import { isNewDomain, getSlug } from '../utils/url'

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
  senderId: string
  presenterUid: string
}

/**
 * TODO: sync pause state, prevent viewer unpause and remove resume button
 */
class Sync {
  isSynced = false
  isActivePresentation = false
  senderId = uuidv4()
  app: FirebaseApp
  reveal: Reveal
  presenterUids: string[]
  ref: DatabaseReference
  presenterValues?: PresentationStore
  explicitUnfollow = false
  magneticTimeout?: number
  magneticTimeoutTime = 1000

  constructor(app: FirebaseApp, reveal: Reveal, presenterUids: string[]) {
    this.app = app
    this.reveal = reveal
    this.presenterUids = presenterUids
    const parent = firebaseDatabase.getDatabase(app)
    this.ref = firebaseDatabase.ref(parent, `presentations/${getSlug()}`)

    getAuth(app).onAuthStateChanged((user: User | null) => {
      if (user) {
        this.handleRevealEvent()
      }
    })
    reveal.addEventListener('slidechanged', this.handleRevealEvent)
    reveal.addEventListener('fragmentshown', this.handleRevealEvent)
    reveal.addEventListener('fragmenthidden', this.handleRevealEvent)
    reveal.addEventListener('overviewhidden', this.handleRevealEvent)
    reveal.addEventListener('overviewshown', this.handleRevealEvent)

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

  startSync = () => {
    this.isSynced = true
    this.explicitUnfollow = false
    handleEnableSync()
  }

  /**
   * Server value change from presenter
   */
  handleServerChange = (snapshot: DataSnapshot) => {
    const values = this.getSnapshotValues(snapshot)
    this.presenterValues = values
    if (values && !this.isSender(this.presenterValues.senderId)) {
      if (!this.isActivePresentation) {
        this.initializeViewerPresentation()
      } else if (this.isSynced) {
        this.updateSlides(values)
      }
    } else {
      this.killPresentation()
    }
  }

  syncRemote = (snapshot: DataSnapshot) => {
    if (snapshot.exists()) {
      const values = this.getSnapshotValues(snapshot)
      if (values)
        if (this.isSynced) {
          this.updateSlides(values)
        }
    }
  }

  updateSlides = (values: PresentationStore) => {
    this.setSlideLocation(values.indices)
    this.setSlideState(values.state)
  }

  getSnapshotValues = (
    snapshot: DataSnapshot
  ): PresentationStore | null | undefined =>
    snapshot.exists() ? (snapshot.val() as PresentationStore | null) : undefined

  stopSync = (explicit = false) => {
    this.explicitUnfollow = explicit
    this.isSynced = false
    handleDisableSync()
  }

  getState = (): State =>
    this.reveal.isOverview() ? State.OVERVIEW_SHOWN : State.OVERVIEW_HIDDEN

  handleRevealEvent = (event?: RevealEvent) => {
    if (this.isAuthorizedPresenter()) {
      this.emitRevealAction(this.getState(), this.reveal.getIndices())
    } else {
      this.handleRoamingUser(event)
    }
  }

  /**
   * Magnetic follow - allow participants to roam and come back
   */
  handleRoamingUser = (position?: { indexh: number; indexv: number }) => {
    if (this.magneticTimeout) {
      window.clearTimeout(this.magneticTimeout)
    }
    const user = this.getActiveUser()
    if (
      !this.explicitUnfollow &&
      this.presenterValues &&
      this.presenterValues.senderId !== this.senderId &&
      (!user || user.uid !== this.presenterValues.presenterUid)
    ) {
      if (!this.isSynced) {
        this.magneticTimeout = window.setTimeout(() => {
          if (
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

  setSlideState = (state: State) => {
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

  setSlideLocation = (indices: Indices) => {
    if (!indices) {
      throw Error('Unable to identify indices from sync.')
    }
    this.reveal.slide(indices.h, indices.v, indices.f || undefined)
  }

  emitRevealAction = (state: State, indices: Indices) => {
    const values: PresentationStore = {
      state,
      indices: {
        h: indices.h,
        v: indices.v,
        f: indices.f || null,
      },
      senderId: this.senderId,
      presenterUid: this.getActiveUser().uid,
    }
    void firebaseDatabase.set(this.ref, values)
  }

  getActiveUser = (): User | null => getAuth(this.app).currentUser

  isAuthorizedPresenter = () => {
    const currentUser = this.getActiveUser()
    return currentUser && this.presenterUids.includes(currentUser.uid)
  }

  isPresenter = () =>
    this.presenterValues && this.isSender(this.presenterValues.senderId)

  isSender = (id: string) => id === this.senderId

  initializeViewerPresentation = () => {
    if (!this.isSender(this.presenterValues.senderId)) {
      showSyncButton()
      this.isActivePresentation = true
      if (!this.isSynced) {
        this.startSync()
      }
    }
  }

  killPresentation = () => {
    // event listeners should clean up themselves
    // void firebaseDatabase.remove(this.ref)
    this.isActivePresentation = false
    hideSyncButton()
  }

  handleRevealReady = () => {
    this.modifyExternalPresentationLinks()
  }

  /**
   * If link is not relative,
   * open it in a new tab and pause the presentation
   */
  modifyExternalPresentationLinks = () => {
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

export default (app: FirebaseApp, reveal: Reveal, presenterUids: string[]) => {
  new Sync(app, reveal, presenterUids)
}
