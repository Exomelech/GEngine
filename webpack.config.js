const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

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
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.ttf$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
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
