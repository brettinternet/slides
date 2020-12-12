const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./paths')
const getSlides = require('./templates')

const pathPrefix = process.env.PATH_PREFIX || '/'
const pages = getSlides()

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-transform-runtime'],
  },
}

module.exports = {
  entry: {
    main: [path.resolve(paths.scripts, 'main.ts'), path.resolve(paths.styles, 'main.sass')],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [babelLoader, 'ts-loader'],
        include: paths.scripts,
      },
      {
        test: /\.js$/,
        use: babelLoader,
        include: paths.scripts,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      node_modules: paths.nodeModules,
    },
  },
  output: {
    path: paths.build,
    crossOriginLoading: 'anonymous',
    publicPath: pathPrefix,
  },
  plugins: [
    ...pages.map(
      ({ slug, content }) =>
        new HtmlWebpackPlugin({
          filename: path.resolve(paths.build, `${slug}.html`),
          templateContent: content,
          chunks: ['main'],
          scriptLoading: 'defer',
        })
    ),
  ],
}
