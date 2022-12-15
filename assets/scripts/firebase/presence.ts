import { FirebaseApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import * as firebaseDatabase from 'firebase/database'

import type { DbPaths } from './index'

const presenceState = {
  ONLINE: 'online',
  OFFLINE: 'offline',
} as const

type PresenceState = typeof presenceState[keyof typeof presenceState]

type StatusStore = {
  state: PresenceState
  lastChanged: unknown
  instanceId?: string[]
  uid?: string
}

type Args = {
  app: FirebaseApp
  dbPaths: DbPaths
  clientId: string
  instanceId: string
  onPresenceCountChange: (size: number) => void
  // onPresenterPresenceChange: PresenceState
}

/**
 * @source https://firebase.google.com/docs/firestore/solutions/presence
 */
export default async ({
  app,
  dbPaths,
  clientId,
  instanceId,
  onPresenceCountChange,
}: // onPresenterPresenceChange,
Args) => {
  const uid = getAuth(app).currentUser?.uid

  const db = firebaseDatabase.getDatabase(app)
  const presence = firebaseDatabase.ref(db, dbPaths.presence)
  const clientPresenceRef = firebaseDatabase.child(presence, clientId)

  const isOfflineForDatabase: StatusStore = {
    state: presenceState.OFFLINE,
    lastChanged: firebaseDatabase.serverTimestamp(),
  }

  const isOnlineForDatabase: StatusStore = {
    state: presenceState.ONLINE,
    lastChanged: firebaseDatabase.serverTimestamp(),
  }

  if (uid) {
    isOfflineForDatabase.uid = uid
    isOnlineForDatabase.uid = uid
  }

  const instancesClientPresenceRef = firebaseDatabase.child(
    clientPresenceRef,
    'instanceId'
  )

  const newInstanceRef = await firebaseDatabase.push(instancesClientPresenceRef)
  firebaseDatabase.set(newInstanceRef, instanceId)

  const connectedRef = firebaseDatabase.ref(db, '.info/connected')
  firebaseDatabase.onValue(connectedRef, (snapshot) => {
    if (snapshot.val() == false) {
      return
    }
    firebaseDatabase
      .onDisconnect(clientPresenceRef)
      .set(isOfflineForDatabase)
      .then(() => {
        firebaseDatabase.update(clientPresenceRef, isOnlineForDatabase)
      })
  })

  firebaseDatabase.onValue(presence, (snapshot) => {
    console.log('snapshot: ', snapshot.size)
    onPresenceCountChange(snapshot.size)
  })

  return {
    uid,
  }
}
