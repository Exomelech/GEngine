const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const rules = require('./webpack.rules');

module.exports = {
  mode: 'development',
  devServer: {
    hot: true
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bundle')
  },
  module: {
    rules
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "content/", to: "content/" }
      ],
    }),
  ]
};
