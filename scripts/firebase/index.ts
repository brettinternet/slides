import Reveal from 'reveal.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/analytics'

import auth from './auth'
import sync from './sync'
import header from './header'
import { inIframe } from '../utils/dom'

export default (reveal: Reveal) => {
  const { config } = window.app.firebase

  if (!inIframe() && config && 'apiKey' in config) {
    const app = firebase.initializeApp(config)

    if (config.measurementId) {
      app.analytics()
    }

    auth(app)
    header(reveal)
    sync(app, reveal)
  }
}
