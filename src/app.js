const Server = require("./server.js");
require("dotenv").config();
const app = Server.app();
const path = require("path");
const mongoose = require("mongoose");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("../webpack.config.js");


mongoose.connect(process.env.MONGO_URL);
console.log("App Env - ", process.env.NODE_ENV);
const isDeveloping = process.env.NODE_ENV !== "production";
console.log("App Dev? - ", isDeveloping);
const port = isDeveloping ? 8080 : process.env.PORT;
const indexPath = path.join(__dirname, "/../public/index.html");

if (isDeveloping) {
  const compiler = webpack(config);
  console.log("Dev Config -", config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: "./",
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler, {
    log: console.log, path: "/__webpack_hmr", heartbeat: 10 * 1000,
  }));
} else {
  console.log("production");
}

app.listen(port);
console.log(`Listening at http://localhost:${port}`)
;
