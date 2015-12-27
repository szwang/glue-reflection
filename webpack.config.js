var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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

var serverConfig = {
  entry: './src/server.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },

  devtool: 'sourcemap',

  target: 'node',
  // do not include polyfills or mocks for node stuff
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },
  // all non-relative modules are external
  // abc -> require('abc')
  externals: /^[a-z\-0-9]+$/,

  plugins: [
    // enable source-map-support by installing at the head of every chunk
    new webpack.BannerPlugin('require("source-map-support").install();',
      {raw: true, entryOnly: false})
  ],

  module: {
    loaders: [
      {
        // transpile all .js files using babel
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
};

module.exports = frontendConfig;