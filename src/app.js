const Server = require('./server.js')
require("dotenv").config()
const port = (process.env.PORT || 8080)
const app = Server.app()
const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL);

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const config = require('../webpack.config.js')
  const compiler = webpack(config)

  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: config.output.publicPath
  }));

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log,
  }));
}

app.listen(port)
console.log(`Listening at http://localhost:${port}`)