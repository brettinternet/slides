import Reveal from 'reveal.js'

import { showUserMenu, hideUserMenu, showHeader } from './handlers'

export default (reveal: Reveal) => {
  showHeader()

  /**
   * Dismiss dropdowns when inner button is selected
   */
  const dropdowns = document.getElementsByClassName(
    'dropdown'
  ) as HTMLCollectionOf<HTMLElement>
  Array.from(dropdowns).forEach((dropdown) => {
    const buttons = dropdown.getElementsByTagName('button')
    Array.from(buttons).forEach((button) => {
      button.addEventListener('click', hideUserMenu)
    })
  })

  /**
   * Event handlers
   */
  const notes = document.getElementById('open-notes')
  notes?.addEventListener('click', () => {
    reveal.getPlugin('notes').open()
  })

  const userMenu = document.getElementById('user-menu')
  if (userMenu) {
    userMenu.onclick = showUserMenu
  }

  const authContainer = document.getElementById('auth')
  authContainer.addEventListener('mouseleave', hideUserMenu)
}
