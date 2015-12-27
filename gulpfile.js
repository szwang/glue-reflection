var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var DeepMerge = require('deep-merge');
var nodemon = require('nodemon');
var WebpackDevServer = require('webpack-dev-server');

// webpack configuration
var defaultConfig = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    ]
  }
}

// for turning production mode
if(process.env.NODE_ENV !== 'production') {
  defaultConfig.devtool = 'source-map';
  defaultConfig.debug = true;
}

// frontend
var frontendConfig = {
  entry: './src/app.js',
  output: {
    publicPath: 'http://localhost:8080/',
    path: __dirname,
    filename: './build/bundle.js'
  },
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel'
        ]
      }
    ]
  }
};

function onBuild(done) {
  return function(err, stats) {
    if(err) {
      console.log('Error', err);
    }
    else {
      console.log(stats.toString());
    }
    if(done) {
      done();
    }
  }
}

gulp.task('frontend-build', function(done) {
  webpack(frontendConfig).run(onBuild(done))
})

gulp.task('watch', function() {
  nodemon({
    script: './app/server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('default', ['build', 'watch']);





