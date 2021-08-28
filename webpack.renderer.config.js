const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const rules = require('./webpack.rules');

module.exports = {
  mode: 'development',
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
      '@': path.join(__dirname, '/src/'),
      '@S': path.join(__dirname, '/src/server/'),
      '@C': path.join(__dirname, '/src/client/'),
      '@CI': path.join(__dirname, '/src/client/interface/'),
      '@Shared': path.join(__dirname, '/src/shared/'),
      'Shared': path.join(__dirname, '/src/shared/index.js'),
    },
  }
};
