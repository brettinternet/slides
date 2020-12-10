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

const {
  // Options: https://revealjs.com/config/
  config,
  // notesHtml, // TODO: add custom notes html
  theme = 'black',
  highlightTheme = 'agate',
} = window.app.reveal

const deck = new Reveal({
  plugins: [Markdown, Highlight, Math, Notes, Zoom, Search],
  ...config,
})

deck.initialize()

let selectedTheme = 'black'
if (theme && themes.theme.includes(theme)) {
  selectedTheme = theme
}
void import(/* webpackChunkName: "[request]" */ `reveal.js/dist/theme/${selectedTheme}.css`)

let selectedHighlightTheme = 'black'
if (highlightTheme && themes.highlightTheme.includes(highlightTheme)) {
  selectedHighlightTheme = highlightTheme
}
void import(/* webpackChunkName: "[request]" */ `highlight.js/styles/${selectedHighlightTheme}.css`)
