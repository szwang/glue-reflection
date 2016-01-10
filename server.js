var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var config = require('./webpack.config');
var AWS = require('aws-sdk');
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

app.use(bodyParser.json());

AWS.config.loadFromPath('./s3_config.json');
var s3Bucket = new AWS.s3({ params: {Bucket: 'glue-photos'} })


/** ROUTES **/

app.post('/img', function(req, res) {
  var url = req.body.imgURL;
  buf = new Buffer(url.replace(/^data:image\/\w+;base64,/, ""), base64);
  var data = {
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  }
  console.log('data: ', data);
  s3Bucket.putObject(data, function(err, data) {
    if(err) {
      console.log('error: ', err);
    } else {
      console.log('image upload success!')
    }
  })
})

/** SERVE **/

app.use('/', express.static(path.join(__dirname, '/build')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/src/index.html'));
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Listening on port', port);