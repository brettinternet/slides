/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import firebase from 'firebase/app'
import Reveal from 'reveal.js'
import { v4 as uuidv4 } from 'uuid'

import { showSyncButton, hideSyncButton, handleSyncClient, handleStopSync } from './handlers'
import { isNewDomain } from '../utils/url'

type Indices = {
  h: number
  v: number
  f?: number | null
}

enum State {
  OVERVIEW_SHOWN = 'overviewshown',
  OVERVIEW_HIDDEN = 'overviewhidden',
}

type Values = {
  state: State
  indices: Indices
  senderId: string
}

class Sync {
  isSynced = false
  isActivePresentation = false
  senderId = uuidv4()
  app: firebase.app.App
  reveal: Reveal
  presenterUids: string[]
  db: firebase.database.Reference

  constructor(app: firebase.app.App, reveal: Reveal) {
    this.app = app
    this.reveal = reveal
    const { presenterUids } = window.app.firebase
    this.presenterUids = presenterUids
    this.db = app.database().ref(`presentations/${window.app.slug}`)

    app.auth().onAuthStateChanged((user: firebase.User | null) => {
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

    /**
     * If link is not relative,
     * open it in a new tab and pause the presentation
     */
    reveal.addEventListener('ready', () => {
      Array.from(document.links).forEach((anchor) => {
        if (isNewDomain(anchor.href) && this.isAuthorizedPresenter()) {
          anchor.onclick = () => {
            if (!reveal.isPaused()) {
              reveal.togglePause()
            }
            window.open(anchor.href, '_blank')
            return false
          }
        }
      })
    })

    this.db.on('value', this.handleActivePresentationValues)

    const sync = document.getElementById('sync') as HTMLButtonElement | null
    if (sync) {
      sync.addEventListener('click', () => {
        if (this.isSynced) {
          this.stopSync()
        } else {
          this.startSync()
        }
      })
    }

    this.startSync()
  }

  startSync = () => {
    this.isSynced = true
    void this.db.once('value').then(this.handleActivePresentationValues)
    handleSyncClient()
  }

  stopSync = () => {
    this.isSynced = false
    handleStopSync()
  }

  getState = (): State => (this.reveal.isOverview() ? State.OVERVIEW_SHOWN : State.OVERVIEW_HIDDEN)

  handleRevealEvent = () => {
    this.userRevealAction(this.getState(), this.reveal.getIndices())
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
    if (!indices) throw Error('Unable to identify indices from sync.')
    this.reveal.slide(indices.h, indices.v, indices.f || undefined)
  }

  emitRevealAction = (state: State, indices: Indices) => {
    const values: Values = {
      state,
      indices: {
        h: indices.h,
        v: indices.v,
        f: indices.f || null,
      },
      senderId: this.senderId,
    }
    void this.db.set(values)
  }

  userRevealAction = (state: State, indices: Indices) => {
    if (this.isAuthorizedPresenter()) {
      this.emitRevealAction(state, indices)
    }
    // if (/** user proposed action */ false) {
    //   handleStopSync();
    // }
  }

  handleActivePresentationValues = (snapshot: firebase.database.DataSnapshot) => {
    const values = snapshot.val() as Values
    if (values) {
      if (!this.isSender(values.senderId)) {
        showSyncButton()
        if (!this.isActivePresentation) {
          this.isActivePresentation = true
          this.startSync()
        }

        if (this.isSynced) {
          this.setSlideLocation(values.indices)
          this.setSlideState(values.state)
        }
      }
    } else {
      hideSyncButton()
      this.isActivePresentation = false
    }
  }

  isAuthorizedPresenter = () => {
    const currentUser = this.app.auth().currentUser
    return currentUser && this.presenterUids.includes(currentUser.uid)
  }

  isSender = (id: string) => id === this.senderId

  killPresentation = () => {
    // event listeners should clean up themselves
    void this.db.remove()
    this.isActivePresentation = false
  }
}

export default (app: firebase.app.App, reveal: Reveal) => {
  new Sync(app, reveal)
}
