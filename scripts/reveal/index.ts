/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
// @ts-ignore
import Reveal from 'reveal.js'
// @ts-ignore
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js'
// @ts-ignore
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js'
// @ts-ignore
import Math from 'reveal.js/plugin/math/math.esm.js'
// @ts-ignore
import Notes from 'reveal.js/plugin/notes/notes.esm.js'
// @ts-ignore
import Zoom from 'reveal.js/plugin/zoom/zoom.esm.js'
// @ts-ignore
import Search from 'reveal.js/plugin/search/search.esm.js'
import themes from './themes.json'
import { isNewDomain } from '../utils/url'

export default async () => {
  const {
    // notesHtml, // TODO: add custom notes html
    config,
    theme,
    highlightTheme,
  } = window.app.reveal

  const reveal = new Reveal({
    plugins: [Markdown, Highlight, Math, Notes, Zoom, Search],
    ...config,
  })

  reveal.initialize()

  reveal.addEventListener('ready', () => {
    Array.from(document.links).forEach((anchor) => {
      if (isNewDomain(anchor.href)) {
        anchor.target = '_blank'
        anchor.rel = 'noopener noreferrer'
      }
    })
  })

  let selectedTheme = 'black'
  if (theme && themes.themes.includes(theme)) {
    selectedTheme = theme
  }
  await import(/* webpackChunkName: "[request]" */ `reveal.js/dist/theme/${selectedTheme}.css`)

  let selectedHighlightTheme = 'agate'
  if (highlightTheme && themes.highlightThemes.includes(highlightTheme)) {
    selectedHighlightTheme = highlightTheme
  }
  await import(
    /* webpackChunkName: "[request]" */ `highlight.js/styles/${selectedHighlightTheme}.css`
  )

  return reveal
}
