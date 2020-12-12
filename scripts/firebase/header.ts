/* eslint-disable @typescript-eslint/no-unsafe-call */
import Reveal from 'reveal.js'

import { inIframe } from '../utils/dom'
import { showUserMenu, hideUserMenu, showHeader } from './handlers'

export default (reveal: Reveal) => {
  if (!inIframe()) {
    const dropdowns = document.getElementsByClassName('dropdown') as HTMLCollectionOf<HTMLElement>

    /**
     * Set theme colors in header
     */
    const setThemeStyles = (color: string, backgroundColor: string) => {
      const headerRoot = document.getElementById('header')
      if (headerRoot) {
        headerRoot.style.color = color
      }

      Array.from(dropdowns).forEach((el) => {
        el.style.backgroundColor = backgroundColor
        el.style.color = color
      })
    }

    /**
     * Get theme colors
     */
    const revealRootDiv = reveal.getRevealElement()
    const revealRootStyles = window.getComputedStyle(revealRootDiv)
    const color = revealRootStyles.getPropertyValue('color')
    const bodyStyles = window.getComputedStyle(document.body)
    const backgroundColor = bodyStyles.getPropertyValue('background-color')

    setThemeStyles(color, backgroundColor)
    showHeader()

    /**
     * Dismiss dropdowns when inner button is selected
     */
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
  }
}
