import Reveal from 'reveal.js'

/**
 * Set theme colors in header
 */
const setThemeStyles = (color: string, backgroundColor: string) => {
  const headerRoot = document.getElementById('header')
  if (headerRoot) {
    headerRoot.style.color = color
  }

  const backdrops = document.getElementsByClassName(
    'backdrop'
  ) as HTMLCollectionOf<HTMLElement>
  Array.from(backdrops).forEach((el) => {
    el.style.backgroundColor = backgroundColor
    el.style.color = color
  })
  const frontdrop = document.getElementsByClassName(
    'frontdrop'
  ) as HTMLCollectionOf<HTMLElement>
  Array.from(frontdrop).forEach((el) => {
    el.style.color = color
  })
}

export default (reveal: Reveal) => {
  /**
   * Get theme colors
   */
  const revealRootDiv = reveal.getRevealElement()
  const revealRootStyles = window.getComputedStyle(revealRootDiv)
  const color = revealRootStyles.getPropertyValue('color')
  const bodyStyles = window.getComputedStyle(document.body)
  const backgroundColor = bodyStyles.getPropertyValue('background-color')

  setThemeStyles(color, backgroundColor)
}
