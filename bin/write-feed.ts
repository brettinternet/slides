import { outputJsonSync } from 'fs-extra'
import { resolve } from 'path'
import getMeta = require('../config/templates')
import paths = require('../config/paths')

const meta = getMeta()

const feed = meta.reduce(
  (acc, slide) => ({
    ...acc,
    [slide.slug]: slide.frontmatter,
  }),
  {}
)

outputJsonSync(resolve(paths.build, 'feed.json'), feed)
