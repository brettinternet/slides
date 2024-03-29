import * as params from '@params'
import Reveal from 'reveal.js'
import { FirebaseOptions } from 'firebase/app'

import setupFirebase from './firebase'
import setupReveal from './reveal'
import { inIframe } from './utils/dom'
import { tc } from './utils/try'
import setupSync from './sync'

const isProd = params.isProd
const config: FirebaseOptions = {
  apiKey: params.firebaseApiKey,
  authDomain: params.firebaseAuthDomain,
  databaseURL: params.firebaseDatabaseUrl,
  appId: params.firebaseAppId,
  projectId: params.firebaseProjectId,
  measurementId: params.firebaseMeasurementId,
}

const main = async (reveal: Reveal | undefined) => {
  if (!inIframe() && reveal) {
    tc(setupReveal, 'apiKey' in config)?.(reveal)

    const { app, clientId, dbPaths } =
      (await tc(setupFirebase)?.(reveal, config)) || {}

    if (app && clientId && dbPaths) {
      tc(setupSync)?.({
        reveal,
        app,
        dbPaths,
        clientId,
        presenterUids: params.presenterUids.split(','),
      })
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
