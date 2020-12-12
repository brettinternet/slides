const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const SriPlugin = require('webpack-subresource-integrity')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const autoprefixer = require('autoprefixer')
const comments = require('postcss-discard-comments')({
  removeAll: true,
})
const baseConfig = require('./webpack.base')

const isCI = process.env.CI == 'true'

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'hidden-nosources-cheap-module-source-map',
  stats: isCI ? 'errors-only' : 'minimal',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer, comments],
              },
            },
          },
          'resolve-url-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              publicPath: '.',
              outputPath: 'assets',
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: 'assets/[name].[contenthash].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css',
      // Workaround for issue: https://github.com/webpack/webpack/issues/1949
      chunkFilename: ({ chunk: { name } }) => {
        const filename = name ? name.replace(/-css$/, '') : undefined
        return `assets/${filename || '[id]'}.[contenthash].css`
      },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: ['...', new CssMinimizerPlugin()],
    // moduleIds: 'deterministic',
    // runtimeChunk: 'single',
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/, // TODO: exclude reveal.js and highlight.js - move to separate chunker or don't chunk at all?
    //       name: 'vendors',
    //       chunks: 'all',
    //     },
    //   },
    // },
  },
})
