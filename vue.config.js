module.exports = {
  lintOnSave: true,
  devServer: {
    port: 3000,
    https: false,
    proxy: {
      '/.netlify/functions': {
        target: 'http://localhost:9000',
        pathRewrite: {
          '^/\\.netlify/functions': ''
        }
      }
    }
  }
}
