module.exports = [
  {
    test: /\.node$/,
    use: 'node-loader',
  }, {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: [
      {
        loader: '@marshallofsound/webpack-asset-relocator-loader',
        options: {
          outputAssetBase: 'native_modules',
        }
      }
      // 'babel-loader',
    ]
  }, {
    test: /\.js$/,
    exclude: /node_modules/,
    use: 'babel-loader'
  }, {
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: { 
          implementation: require("sass"),
          sassOptions: {
            fiber: require("fibers"),
          }
        }
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
];