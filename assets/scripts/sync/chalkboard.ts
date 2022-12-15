import Reveal from 'reveal.js'

const squareSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>`
const upSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>`
const downSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>`

export default (reveal: Reveal) => {
  window.RevealChalkboard.init(reveal)

  const chalkboardControls = document.getElementById('chalkboard-controls')
  if (chalkboardControls && window.RevealChalkboard) {
    chalkboardControls.style.display = ''

    const squares = document.getElementsByClassName(
      'fa-square'
    ) as HTMLCollectionOf<HTMLElement>
    Array.from(squares).forEach((el) => {
      if (el.parentElement) {
        el.parentElement.innerHTML = squareSvg
      }
    })
    const chevronUps = document.getElementsByClassName('fa-chevron-up')
    Array.from(chevronUps).forEach((el) => {
      if (el.parentElement) {
        el.parentElement.innerHTML = upSvg
      }
    })
    const chevronDowns = document.getElementsByClassName('fa-chevron-down')
    Array.from(chevronDowns).forEach((el) => {
      if (el.parentElement) {
        el.parentElement.innerHTML = downSvg
      }
    })
  }
}
