const path = require('path')

const ROOT = process.cwd()

module.exports = {
  root: ROOT,
  config: path.resolve(ROOT, 'config'),
  scripts: path.resolve(ROOT, 'scripts'),
  styles: path.resolve(ROOT, 'styles'),
  nodeModules: path.resolve(ROOT, 'node_modules'),
  build: path.resolve(ROOT, 'build'),
  assets: path.resolve(ROOT, 'build', 'assets'),
  templates: path.resolve(ROOT, 'templates'),
  slides: path.resolve(ROOT, 'slides'),
}
