import { readdirSync, outputJsonSync, lstatSync } from 'fs-extra'
import { resolve, extname } from 'path'
import paths = require('../config/paths')

const highlightThemes = resolve(paths.nodeModules, 'highlight.js', 'styles')
const revealThemes = resolve(paths.nodeModules, 'reveal.js', 'dist', 'theme')

const removeExtension = (filename: string) => filename.split('.').slice(0, -1).join('.')

const getCSSAssetReducer = (dir: string) => (acc: string[], filename: string) => {
  if (lstatSync(resolve(dir, filename)).isFile() && extname(filename) === '.css') {
    return acc.concat(removeExtension(filename))
  } else {
    return acc
  }
}

const themes = {
  themes: readdirSync(revealThemes).reduce(getCSSAssetReducer(revealThemes), []),
  highlightThemes: readdirSync(highlightThemes).reduce(getCSSAssetReducer(highlightThemes), []),
}

outputJsonSync(resolve(paths.scripts, 'reveal', 'themes.json'), themes)
