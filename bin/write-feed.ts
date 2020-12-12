import { outputJsonSync } from 'fs-extra'
import { resolve } from 'path'
import compile = require('../config/templates')
import paths = require('../config/paths')

const meta = compile()

outputJsonSync(
  resolve(paths.build, 'feed.json'),
  meta.map(({ frontmatter }) => frontmatter)
)
