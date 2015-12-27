require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var express = __webpack_require__(1);
	var path = __webpack_require__(2);
	var session = __webpack_require__(3);
	var fs = __webpack_require__(4);
	var bodyParser = __webpack_require__(5);
	
	var app = express();
	
	app.use(function (req, res, next) {
	  console.log(req.path);
	  next();
	});
	
	app.use(bodyParser.json());
	
	app.use('/', express['static'](path.join(__dirname, '/../build')));
	// app.use('/assets', express.static(path.join(__dirname, '/assets')));
	
	app.get('*', function (req, res) {
	  res.sendFile(path.join(__dirname, '../src/index.html'));
	});
	
	var port = process.env.PORT || 3000;
	
	app.listen(port);
	console.log('Listening on port', port);
	
	/**** FOR WEBPACK HOT-RELOADING ***/
	
	var webpack = __webpack_require__(6);
	var webpackConfig = __webpack_require__(7);
	var compiler = webpack(webpackConfig);
	
	app.use(__webpack_require__(9)(compiler, {
	  noInfo: true, publicPath: webpackConfig.output.publicPath
	}));
	
	app.use(__webpack_require__(10)(compiler));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var webpack = __webpack_require__(6);
	var path = __webpack_require__(2);
	var HtmlWebpackPlugin = __webpack_require__(8);
	
	var frontendConfig = {
	  entry: ['webpack-hot-middleware/client', './src/app.js'],
	
	  output: {
	    filename: './build/bundle.js'
	  },
	
	  devtool: 'sourcemap',
	
	  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin(), new webpack.optimize.OccurenceOrderPlugin()],
	
	  module: {
	    loaders: [{
	      test: /\.js$/,
	      // include: path.join(__dirname, 'src', 'frontend'),
	      exclude: /node_modules/,
	      loaders: ['react-hot', 'babel']
	    }, {
	      test: /\.scss$/,
	      // include: path.join(__dirname, 'src', 'frontend', 'scss'),
	      exclude: /node_modules/,
	      loaders: ['style', 'css', 'sass']
	    }]
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
	  new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false })],
	
	  module: {
	    loaders: [{
	      // transpile all .js files using babel
	      test: /\.js$/,
	      exclude: /node_modules/,
	      loader: 'babel'
	    }]
	  }
	};
	
	module.exports = [frontendConfig, serverConfig];

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("html-webpack-plugin");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map