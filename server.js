var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var config = require('./webpack.config');
var app = express();

app.use(function(req, res, next) {
  console.log(req.path);
  next();
});

var compiler = webpack(config);

// app.use(require('webpack-dev-middleware')(compiler, {
//     noInfo: true,
//     publicPath: config.output.publicPath
// }));

// app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '/build')));
// app.use('/assets', express.static(path.join(__dirname, '/assets')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/src/index.html'));
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Listening on port', port);