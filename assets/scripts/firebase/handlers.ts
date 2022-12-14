import { User, updateProfile } from 'firebase/auth'

import { stopPropagation } from '../utils/dom'

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
  const userDropdown = document.getElementById('user-dropdown')
  if (userDropdown) {
    userDropdown.onclick = stopPropagation
    userDropdown.style.display = ''
    userDropdown.setAttribute('aria-hidden', 'false')
    document.addEventListener('click', handleDocumentDropdownClick)
  }
  const userMenu = document.getElementById('user-menu')
  if (userMenu) {
    userMenu.classList.add('opaque')
    userMenu.onclick = hideUserMenu
  }
}

export const hideUserMenu = () => {
  const userDropdown = document.getElementById('user-dropdown')
  if (userDropdown) {
    userDropdown.style.display = 'none'
    userDropdown.setAttribute('aria-hidden', 'true')
    document.removeEventListener('click', handleDocumentDropdownClick)
  }
  const userMenu = document.getElementById('user-menu')
  if (userMenu) {
    userMenu.classList.remove('opaque')
    userMenu.onclick = showUserMenu
  }
}

function handleDocumentDropdownClick() {
  hideUserMenu()
}

/**
 * Auth
 */

export const hideAuthUI = () => {
  const uiRoot = document.getElementById('firebase-ui')
  if (uiRoot) {
    uiRoot.style.display = 'none'
    uiRoot.setAttribute('aria-hidden', 'true')
    document.removeEventListener('click', handleDocumentAuthClick)
  }
}

function handleDocumentAuthClick() {
  hideAuthUI()
}

export const handleSignInClick = (ev: MouseEvent) => {
  stopPropagation(ev)
  const uiRoot = document.getElementById('firebase-ui')
  if (uiRoot) {
    uiRoot.style.display = ''
    uiRoot.setAttribute('aria-hidden', 'false')
    document.body.appendChild(uiRoot)
    uiRoot.onclick = stopPropagation
    uiRoot.focus()
  }
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

/**
 * Sync
 */

export const handleEnableSync = () => {
  const sync = document.getElementById('sync')
  const syncStatusIconActive = document.getElementById(
    'sync-status-icon-active'
  )
  const syncStatusIconInactive = document.getElementById(
    'sync-status-icon-inactive'
  )
  const syncStatusText = document.getElementById('sync-status-text')
  if (sync) {
    sync.classList.add('active')
    sync.title = 'Unfollow'
  }
  if (syncStatusIconInactive) {
    syncStatusIconInactive.style.display = 'none'
  }
  if (syncStatusIconActive) {
    syncStatusIconActive.style.display = ''
  }
  if (syncStatusText) {
    syncStatusText.innerText = 'Following'
  }
}

export const handleDisableSync = () => {
  const sync = document.getElementById('sync')
  const syncStatusIconActive = document.getElementById(
    'sync-status-icon-active'
  )
  const syncStatusIconInactive = document.getElementById(
    'sync-status-icon-inactive'
  )
  const syncStatusText = document.getElementById('sync-status-text')
  if (sync) {
    sync.classList.remove('active')
    sync.title = 'Follow'
  }
  if (syncStatusIconActive) {
    syncStatusIconActive.style.display = 'none'
  }
  if (syncStatusIconInactive) {
    syncStatusIconInactive.style.display = ''
  }
  if (syncStatusText) {
    syncStatusText.innerText = 'Not following'
  }
}

export const showSyncButton = () => {
  const syncButton = document.getElementById('sync')
  if (syncButton) {
    syncButton.style.display = ''
  }
}

export const hideSyncButton = () => {
  const syncButton = document.getElementById('sync')
  if (syncButton) {
    syncButton.style.display = 'none'
    handleDisableSync()
  }
}
