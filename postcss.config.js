module.exports = {
  plugins: [
    require('postcss-import')({
      path: ['assets/styles', 'assets', 'node_modules'],
    }),
    require('autoprefixer'),
  ],
}
