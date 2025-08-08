import { load } from '@fingerprintjs/fingerprintjs'
import { initializeAnalytics } from 'firebase/analytics'
import { type FirebaseOptions, initializeApp } from 'firebase/app'
import type Reveal from 'reveal.js'

// import presence from './presence'
import { getSlug } from '../utils/url'
import auth from './auth'
import header from './header'

export type DbPaths = {
  presentation: string
  presence: string
}

/**
 * Unique device ID
 */
const getClientId = async () => {
  const agent = await load()
  const result = await agent.get()
  return result.visitorId
}

const getDbPaths = (slug: string) => ({
  presentation: `presentations/${slug}`,
  presence: `status/${slug}`,
})

export default async (reveal: Reveal, config: FirebaseOptions) => {
  const clientId = await getClientId()
  const dbPaths = getDbPaths(getSlug())

  const app = initializeApp(config)
  if (config.measurementId) {
    initializeAnalytics(app)
  }

  auth(app)
  header(reveal)
  // await presence({
  //   app,
  //   dbPaths,
  //   clientId,
  //   instanceId,
  // })
  return {
    app,
    dbPaths,
    clientId,
  }
}
