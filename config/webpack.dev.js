const { merge } = require('webpack-merge')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const chokidar = require('chokidar')
const paths = require('./paths')
const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', 'sass-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '.',
              outputPath: 'assets',
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: 'assets/[name].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    contentBase: paths.build,
    port: process.env.PORT || 3000,
    open: false,
    // It appears HTML files must be written in order for static options to work
    writeToDisk: (filePath) => filePath.includes('.html'),
    // In order to server static files without the extension: https://stackoverflow.com/a/40201169/6817437
    staticOptions: {
      index: false,
      extensions: ['html'],
    },
    before: (_app, server) => {
      chokidar
        .watch([`${paths.slides}/**/*`, `${paths.templates}/**/*.pug`, `${paths.config}/**/*`])
        .on('all', function () {
          // TODO: doesn't appear to work with Webpack 5, sockets mights be stale
          server.sockWrite(server.sockets, 'content-changed')
        })
    },
  },
})
