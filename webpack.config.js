var webpack = require('webpack');
var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

var frontendConfig = {
  entry: './src/app.js',

  output: {
    filename: './build/bundle.js',
    path: __dirname
  },

  devtool: 'source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
    // new HtmlWebpackPlugin({
    //   title: 'Skele',
    //   filename: 'index.html',
    //   template: 'src/frontend/index.template.html',
    //   inject: true
    // })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        // include: path.join(__dirname, 'src', 'frontend'),
        loaders: ['babel', 'react-hot'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        // include: path.join(__dirname, 'src', 'frontend', 'scss'),
        loaders: ['style', 'css', 'sass'],
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = frontendConfig;