import type { FirebaseApp } from 'firebase/app'
import type Reveal from 'reveal.js'

import type { DbPaths } from '../firebase'
import slideSync from './sync'

// import showChalkboardControls from './chalkboard'

type Args = {
  reveal: Reveal
  app: FirebaseApp
  clientId: string
  presenterUids: string[]
  dbPaths: DbPaths
}

export default ({ reveal, app, clientId, presenterUids, dbPaths }: Args) => {
  // const onPresentationStart = (isPresenter: boolean) => {
  //   if (isPresenter) {
  //     showChalkboardControls(reveal)
  //   }
  // }
  slideSync({
    app,
    reveal,
    clientId,
    presenterUids,
    dbPaths,
    // onPresentationStart,
  })
}
