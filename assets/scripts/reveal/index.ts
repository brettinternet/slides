import Reveal from 'reveal.js'

import styles from './styles'
import { isNewDomain } from '../utils/url'

const openLinksInNewTab = () => {
  Array.from(document.links).forEach((anchor) => {
    if (isNewDomain(anchor.href)) {
      anchor.setAttribute('target', '_blank')
    }
  })
}

export default (reveal: Reveal) => {
  styles(reveal)
  openLinksInNewTab()
}
