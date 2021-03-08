const CopyPlugin = require("copy-webpack-plugin");
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
  ]
};
