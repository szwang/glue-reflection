var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var config = require('./webpack.config');
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var fs = require('fs');
var app = express();

var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.use(function(req, res, next) {
  console.log(req.path);
  next();
});

app.use(bodyParser.json({ limit: '50mb' }));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

if(app.get('env') !== 'development') {
  var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
  var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
  AWS.config.update({ accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY });
}

app.use('/s3', require('./s3Router')({
  bucket: 'recordrtc-test',
  ACL: 'public-read'
}))

/** ROUTES **/



/** SERVE **/

app.use('/', express.static(path.join(__dirname, '/build')));
app.use('/assets', express.static(path.join(__dirname, '/src/assets')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/src/index.html'));
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Listening on port', port);


