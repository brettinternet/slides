import Reveal from 'reveal.js'

declare global {
  interface Window {
    Reveal?: Reveal
    RevealChalkboard: { init: (reveal: Reveal) => void }
  }
}
