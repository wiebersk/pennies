const Server = require('./server.js')
require("dotenv").config()
const app = Server.app()
const path = require('path')
const mongoose = require('mongoose')
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');


mongoose.connect(process.env.MONGO_URL);
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 8080 : process.env.PORT;
const indexPath = path.join(__dirname, '/../public/index.html')

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: './',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

} else {
  console.log('production');
}

app.listen(port)
console.log(`Listening at http://localhost:${port}`)