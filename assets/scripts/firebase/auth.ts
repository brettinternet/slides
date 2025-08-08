import type { FirebaseApp } from 'firebase/app'
import { GithubAuthProvider, getAuth } from 'firebase/auth'
import { auth as FirebaseUI } from 'firebaseui'

import {
  handleSignedIn,
  handleSignInClick,
  handleSignOut,
  hideAuthUI,
} from './handlers'

const config: FirebaseUI.Config = {
  signInFlow: 'popup',
  signInOptions: [
    GithubAuthProvider.PROVIDER_ID,
    // AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: window.location.hostname,
  privacyPolicyUrl: window.location.hostname,
}

export default (app: FirebaseApp) => {
  const auth = getAuth(app)
  const ui = new FirebaseUI.AuthUI(auth)
  ui.start('#firebase-ui', config)

  auth.onAuthStateChanged((user) => {
    if (user) {
      handleSignedIn(user)
    } else {
      handleSignOut()
    }
  }, console.error)

  const signOut = document.getElementById('sign-out')
  if (signOut) {
    signOut.onclick = () => {
      void auth.signOut()
      window.location.reload()
    }
  }
  const signIn = document.getElementById('sign-in')
  if (signIn) {
    signIn.addEventListener('click', handleSignInClick)
  }
  const dismiss = document.getElementById('firebase-ui-close')
  if (dismiss) {
    dismiss.addEventListener('click', hideAuthUI)
  }
}
