module.exports = {
  devServer: {
    port: 8000,
    proxy: process.env.VUE_APP_MOCK_SERVER
  }
}
