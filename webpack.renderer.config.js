const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const rules = require('./webpack.rules');
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    hot: true,
    contentBase: './src/content'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bundle'),
    publicPath: ASSET_PATH,
  },
  module: {
    rules,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    })
  ]
};
