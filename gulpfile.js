var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var DeepMerge = require('deep-merge');
var nodemon = require('nodemon');
var WebpackDevServer = require('webpack-dev-server');

// for recursively merging objects, and overriding the default webpack configs
var deepmerge = DeepMerge(function(target, source, key) {
  if(target instanceof Array) {
    return [].concat(target, source);
  }
  return source;
})

// webpack configuration
var defaultConfig = {
  module: {
    loaders: [

    ]
  }
}

// for turning production mode
if(process.env.NODE_ENV !== 'production') {
  defaultConfig.devtool = 'source-map';
  defaultConfig.debug = true;
}

// merge default config with function input
function config(overrides) {
  return deepmerge(defaultConfig, overrides || {});
}

// front-end webpack configuration
var frontendConfig = config({
  entry: [

  ],
  output: [

  ],
  plugins: [
  
  ]
})

// backend configuration
var nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function(x) { // TODO add more descriptive input
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });










