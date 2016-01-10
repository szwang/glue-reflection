var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './src/app.js'
  ],

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build')
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel?presets[]=react,presets[]=es2015']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style', 'css']
      }
    ]
  },

  plugins: [
    // new HtmlWebpackPlugin({
    //   template: 'app/index.tpl.html',
    //   inject: 'body',
    //   filename: 'index.html'
    // }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};