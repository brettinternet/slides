import { type User, updateProfile } from 'firebase/auth'

import { stopPropagation } from '../utils/dom'

const withElement = (id: string, callback: (element: HTMLElement) => void) => {
  const element = document.getElementById(id)
  if (element) {
    callback(element)
  }
}

const setVisible = (id: string, visible: boolean, ariaHidden: boolean) => {
  withElement(id, (element) => {
    element.style.display = visible ? '' : 'none'
    element.setAttribute('aria-hidden', String(ariaHidden))
  })
}

/**
 * Header
 */

export const showHeader = () => {
  const header = document.getElementById('header')
  if (header) {
    header.style.display = ''
  }
}

export const showUserMenu = (ev: MouseEvent) => {
  stopPropagation(ev)
  withElement('user-dropdown', (userDropdown) => {
    userDropdown.onclick = stopPropagation
    setVisible('user-dropdown', true, false)
    document.addEventListener('click', handleDocumentDropdownClick)
  })
  withElement('user-menu', (userMenu) => {
    userMenu.classList.add('opaque')
    userMenu.onclick = hideUserMenu
  })
}

export const hideUserMenu = () => {
  setVisible('user-dropdown', false, true)
  document.removeEventListener('click', handleDocumentDropdownClick)
  withElement('user-menu', (userMenu) => {
    userMenu.classList.remove('opaque')
    userMenu.onclick = showUserMenu
  })
}

function handleDocumentDropdownClick() {
  hideUserMenu()
}

/**
 * Auth
 */

export const hideAuthUI = () => {
  setVisible('firebase-ui', false, true)
  document.removeEventListener('click', handleDocumentAuthClick)
}

function handleDocumentAuthClick() {
  hideAuthUI()
}

export const handleSignInClick = (ev: MouseEvent) => {
  stopPropagation(ev)
  withElement('firebase-ui', (uiRoot) => {
    setVisible('firebase-ui', true, false)
    document.body.appendChild(uiRoot)
    uiRoot.onclick = stopPropagation
    uiRoot.focus()
  })
  document.addEventListener('click', handleDocumentAuthClick)
}

export const handleSignOut = () => {
  showSignInButton()
  const userIcon = document.getElementById('user-icon')
  if (userIcon) {
    const userImage = userIcon.getElementsByTagName('img')[0]
    if (userImage) {
      userImage.remove()
    }
  }
}

export const showSignInButton = () => {
  const signIn = document.getElementById('sign-in')
  const userMenu = document.getElementById('user-menu')
  if (signIn) {
    signIn.style.display = ''
  }
  if (userMenu) {
    userMenu.style.display = 'none'
  }
}

/**
 * Login side effects
 */

const hideSignIn = () => {
  const signIn = document.getElementById('sign-in')
  const userMenu = document.getElementById('user-menu')
  if (signIn) {
    signIn.style.display = 'none'
  }
  if (userMenu) {
    userMenu.style.display = ''
  }
}

const setDisplayName = (user: User) => {
  let displayName = user.displayName
  if (!displayName) {
    displayName = 'anonymous'
    void updateProfile(user, { displayName })
  }

  const username = document.getElementById('username')
  if (username) {
    username.innerText = displayName
    username.style.display = 'block'
  }
}

const setUserImage = (user: User) => {
  const userIcon = document.getElementById('user-icon')
  if (userIcon) {
    userIcon.classList.add('with-image')
    const image = document.createElement('img')
    image.src = user.photoURL || ''
    image.alt = user.displayName || ''
    userIcon.appendChild(image)
  }
}

export const handleSignedIn = (user: User) => {
  hideSignIn()
  hideAuthUI()

  setDisplayName(user)

  if (user.photoURL) {
    setUserImage(user)
  }
}
