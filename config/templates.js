const path = require('path')
const fs = require('fs')
const pug = require('pug')
const fm = require('front-matter')
const glob = require('glob')
const paths = require('./paths')

const baseUrl = `https://brettinternet.com/${process.env.PATH_PREFIX || 'slides'}`
const globals = {
  isProd: process.env.NODE_ENV === 'production',
  buildTime: process.env.BUILD_TIME,
  buildVersion: process.env.BUILD_VERSION,
  draft: false,
  twitter: 'brettinternet',
}

const removeExtension = (filename) => filename.split('.').slice(0, -1).join('.')
const template = pug.compileFile(path.resolve(paths.templates, 'base.pug'))

const compile = () => {
  try {
    const filePaths = glob.sync(`${paths.slides}/**/*`, { nodir: true })
    return filePaths.reduce((acc, filePath) => {
      const content = fs.readFileSync(filePath, 'utf-8')
      const { body, attributes } = fm(content)
      if (attributes.draft) {
        return acc
      }
      const filename = path.basename(filePath)
      // TODO: allow inner paths
      const slug = removeExtension(filename)
      if (acc.map(({ slug: s }) => s).includes(slug)) {
        throw Error('Duplicate slug found in /slides')
      }

      const frontmatter = {
        title: slug,
        ...attributes,
        url: `${baseUrl}/${slug}`,
        filename,
        slug,
      }
      return acc.concat({
        slug,
        content: template({
          ...globals,
          ...frontmatter,
          extension: path.extname(filename),
          content: body,
        }),
        frontmatter,
      })
    }, [])
  } catch (err) {
    console.error(err)
    return {}
  }
}

module.exports = compile
