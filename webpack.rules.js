module.exports = [
  {
    test: /\.node$/,
    use: 'node-loader',
  }, {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
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
];