import Reveal from 'reveal.js'
import { initializeApp, FirebaseOptions } from 'firebase/app'
import { initializeAnalytics } from 'firebase/analytics'

import auth from './auth'
import sync from './sync'
import header from './header'

export default (
  reveal: Reveal,
  config: FirebaseOptions,
  presentUids: string[]
) => {
  const app = initializeApp(config)

  if (config.measurementId) {
    initializeAnalytics(app)
  }

  auth(app)
  header(reveal)
  sync(app, reveal, presentUids)
}
