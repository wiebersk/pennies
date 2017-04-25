var rucksack = require("rucksack-css");
var webpack = require("webpack");
var path = require("path");
require("dotenv").config();

module.exports = {
  context: path.join(__dirname, "./src"),
  entry: {
    jsx: "./index.js",
    vendor: [
      "react",
      "react-dom",
      "react-redux",
      "react-router",
      "react-router-redux",
      "redux",
    ],
  },
  output: {
    path: path.join(__dirname, "/public/"),
    filename: "bundle.js",
    publicPath: '/public/',
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
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
    ],
  },
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
  postcss: [
    rucksack({
      autoprefixer: true,
    }),
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"), API_URL: JSON.stringify(process.env.API_URL)},
    }),
  ],
  devServer: {
    contentBase: "./src",
    hot: true,
  },
};
