var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var config = require('./webpack.config');
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
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


  /** ROUTES **/

app.post('/img', function(req, res) {
  if(app.get('env') !== 'development') {
    var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
    var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
    AWS.config.update({ accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY });
  }
  var url = req.body.imgURL;
  buf = new Buffer(url.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  var s3 = new AWS.S3();
  var s3_params = {
    Body: buf,
    Bucket: 'glue-screenshots',
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
    Key: req.body.id.toString()
  } 
  s3.putObject(s3_params, function(err, data) {
    if(err) {
      console.log('error: ', err);
      res.send({ success: false, error: err });
    } else {
      console.log('image upload success!');
      res.send({ success: true, id: req.body.id })
    }
  })
})


/** SERVE **/

app.use('/', express.static(path.join(__dirname, '/build')));
app.use('/assets', express.static(path.join(__dirname, '/assets')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/src/index.html'));
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Listening on port', port);


