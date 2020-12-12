import { auth as FirebaseUIAuth } from 'firebaseui'
import firebase from 'firebase/app'

import { handleSignInClick, hideAuthUI, handleSignedIn, handleSignOut } from './handlers'

const config: FirebaseUIAuth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: window.location.hostname,
  privacyPolicyUrl: window.location.hostname,
}

export default (app: firebase.app.App) => {
  const auth = app.auth()
  const ui = new FirebaseUIAuth.AuthUI(auth)
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
      auth.signOut()
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
