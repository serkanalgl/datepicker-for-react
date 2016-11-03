var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
      main: './src/index.js'
  },
  output: {
      filename: './dist/[name].js'
  },
  module: {
    loaders: [
      {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel'
      },
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css!sass')
      },
      {
          test: /\.png$/,
          loader: "url-loader?mimetype=image/png"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('dist/styles/main.css', {
        allChunks: true
    })
  ]
};