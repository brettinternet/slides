import * as params from '@params'
import type { FirebaseOptions } from 'firebase/app'
import type Reveal from 'reveal.js'

import setupFirebase from './firebase'
import setupReveal from './reveal'
import setupSync from './sync'
import { inIframe } from './utils/dom'
import { tc } from './utils/try'

const config: FirebaseOptions = {
  apiKey: params.firebaseApiKey,
  authDomain: params.firebaseAuthDomain,
  databaseURL: params.firebaseDatabaseUrl,
  appId: params.firebaseAppId,
  projectId: params.firebaseProjectId,
  measurementId: params.firebaseMeasurementId,
}

const hasFirebaseAPIKey = 'apiKey' in config && !!config.apiKey

const main = async (reveal: Reveal | undefined) => {
  if (!inIframe() && reveal) {
    tc(setupReveal, hasFirebaseAPIKey)?.(reveal)

    const { app, clientId, dbPaths } = (await tc(setupFirebase, hasFirebaseAPIKey)?.(reveal, config)) || {}

    if (app && clientId && dbPaths) {
      tc(setupSync, hasFirebaseAPIKey)?.({
        reveal,
        app,
        dbPaths,
        clientId,
        presenterUids: params.presenterUids.split(','),
      })
    }
  }
}

void main(window.Reveal)
