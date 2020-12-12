const path = require('path')
const fs = require('fs')
const pug = require('pug')
const fm = require('front-matter')
const glob = require('glob')
const dotenv = require('dotenv')
const paths = require('./paths')

dotenv.config()
const deserializeArr = (value) => {
  if (Array.isArray(value)) {
    return value
  }
  if (typeof value === 'string') {
    return value.split(',')
  }
}

const baseUrl = `https://brettinternet.com${process.env.PATH_PREFIX || 'slides'}`
/**
 * Can be overridden by frontmatter
 */
const globals = {
  isProd: process.env.NODE_ENV === 'production',
  buildTime: process.env.BUILD_TIME,
  buildVersion: process.env.BUILD_VERSION,
  draft: false,
  twitter: 'brettinternet',
  theme: process.env.THEME,
  highlightTheme: process.env.HIGHLIGHT_THEME,
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    appId: process.env.FIREBASE_APP_ID,
    projectId: process.env.FIREBASE_PROJECT_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  },
  presenterUids: deserializeArr(process.env.PRESENTER_UIDS),
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
