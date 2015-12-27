var webpack = require('webpack');
var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

var frontendConfig = {
  entry: [
    'webpack-hot-middleware/client',
    './src/app.js'
  ],

  output: {
    filename: './build/bundle.js',
    publicPath: 'http://localhost:3000'
  },

  devtool: 'sourcemap',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  watch: true,

  module: {
    loaders: [
      {
        test: /\.js$/,
        // include: path.join(__dirname, 'src', 'frontend'),
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.scss$/,
        // include: path.join(__dirname, 'src', 'frontend', 'scss'),
        exclude: /node_modules/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
};

module.exports = frontendConfig;