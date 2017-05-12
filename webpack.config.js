var rucksack = require("rucksack-css");
var webpack = require("webpack");
var path = require("path");
require("dotenv").config();
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

module.exports = {
  context: path.join(__dirname, "./src"),
  entry: {
    bundle: ["./index.js",
      hotMiddlewareScript,
       'webpack/hot/dev-server'
    ],
    vendor: [
      "react",
      "react-dom",
      "react-redux",
      "react-router",
      "react-router-redux",
      "redux",
      hotMiddlewareScript,
       'webpack/hot/dev-server'
    ]
  },
  module: {
    loaders: [
    {
      test: /\.css$/,
      include: /src/,
      loaders: [
        "style-loader",
        "css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]",
        "postcss-loader",
      ],
    },
    {
      test: /\.css$/,
      exclude: /src/,
      loader: "style!css",
    },
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          "babel-loader",
        ],
      },
    ]
  },
  output: {
    path: path.join(__dirname, "./public"),
    publicPath: "/",
    filename: '[name].js'
  },
  devtool: '#source-map',
  resolve: {
    root: path.resolve(__dirname, "src"),
    alias: {
      actions: "actions",
      components: "components",
      containers: "containers",
      middleware: "middleware",
      reducers: "reducers",
      sagas: "sagas",
      selectors: "selectors",
      store: "store",
      utils: "utils",
    },
    extensions: ["", ".js", ".jsx",],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"), API_URL: JSON.stringify(process.env.API_URL) },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
