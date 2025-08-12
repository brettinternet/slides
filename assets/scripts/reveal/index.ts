import type Reveal from 'reveal.js'

import { isNotALinkToSlide } from '../utils/url'
import styles from './styles'

const openLinksInNewTab = () => {
  Array.from(document.links).forEach((anchor) => {
    if (isNotALinkToSlide(anchor.href)) {
      anchor.setAttribute('target', '_blank')
    }
  })
}

export default (reveal: Reveal) => {
  openLinksInNewTab()
  styles(reveal)
}
