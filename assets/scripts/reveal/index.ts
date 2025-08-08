import type Reveal from 'reveal.js'

import { isNewDomain } from '../utils/url'
import styles from './styles'

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
