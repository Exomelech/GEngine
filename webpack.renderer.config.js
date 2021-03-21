const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const rules = require('./webpack.rules');

const SHARED_PATH = path.join(__dirname, './src/shared/index.js');
const PROXY_EVENTS_PATH = path.join(__dirname, './src/shared/proxyEvents.js');

module.exports = {
  mode: 'production',
  devServer: {
    hot: true,
    contentBase: './content/'
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
  ],
  resolve: {
    alias: {
      Shared: SHARED_PATH,
      ProxyEvents: PROXY_EVENTS_PATH
    },
  }
};
