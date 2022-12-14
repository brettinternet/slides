import * as params from '@params'
import Reveal from 'reveal.js'
import { FirebaseOptions } from 'firebase/app'

import setupFirebaseSync from './firebase'
import setReveal from './reveal'
import { inIframe } from './utils/dom'

const isProd = params.isProd
const config: FirebaseOptions = {
  apiKey: params.firebaseApiKey,
  authDomain: params.firebaseAuthDomain,
  databaseURL: params.firebaseDatabaseUrl,
  appId: params.firebaseAppId,
  projectId: params.firebaseProjectId,
  measurementId: params.firebaseMeasurementId,
}

const main = async (reveal: Reveal) => {
  if (!inIframe() && reveal && 'apiKey' in config) {
    try {
      setReveal(reveal)
    } catch (error) {
      console.error(error)
    }

    try {
      setupFirebaseSync(reveal, config, params.presenterUids.split(','))
    } catch (error) {
      console.error(error)
    }
  } else if (!isProd) {
    if (!('apiKey' in config)) {
      console.error(
        `Unable to initialize the firebase connection with config: ${config}`
      )
    }
    if (!reveal) {
      console.warn(`Unable to locate Reveal instance: ${reveal}`)
    }
  }
}

void main(window.Reveal)
