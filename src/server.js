var express = require('express');
var path = require('path');
var session = require('express-session');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

app.use(function(req, res, next) {
  console.log(req.path);
  next();
});

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '/../build')));
// app.use('/assets', express.static(path.join(__dirname, '/assets')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Listening on port', port);
