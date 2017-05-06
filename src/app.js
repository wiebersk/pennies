const Server = require('./server.js')
require("dotenv").config()
const port = (process.env.PORT || 8080)
const app = Server.app()
const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL);

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../webpack.config.js')
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
 }))
}

app.listen(port)
console.log(`Listening at http://localhost:${port}`)