var rucksack = require("rucksack-css");
var webpack = require("webpack");
var path = require("path");
require("dotenv").config();
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsPlugin = require("stats-webpack-plugin");

module.exports = {
  devtool: "eval-source-map",
  context: path.join(__dirname, "./src"),
  entry: {
    bundle: ["./index.js",],
    vendor: [
      "react",
      "react-dom",
      "react-redux",
      "react-router",
      "react-router-redux",
      "redux",
    ],
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
    ],
  },
  output: {
    path: path.join(__dirname, "./public"),
    publicPath: "/",
    filename: "[name].js",
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
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true,
      },
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"), API_URL: JSON.stringify(process.env.API_URL),
    }),
  ],
  postcss: [
    require("autoprefixer"),
  ],
};
