var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var config = require('./webpack.config');
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var fs = require('fs');
var utils = require('./serverUtils');
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

  /** ROUTES **/

app.post('/videoUpload', function(req, res) {
  var files = req.body;

  if(!files.video) {
    utils.uploadToDisk(files.audio, true)
    .then(function(status) {
      res.send(status);
    })
  } else {
    utils.uploadToDisk(files.video, false);
    utils.uploadToDisk(files.audio, false)
    .then(function() { 
      return utils.merge(files);
    })
    .then(function(status) {
      console.log(status)
      res.send(status);
    })
  }
});

// 
app.use('/s3', require('./s3Router')({
  bucket: 'recordrtc-test',
  ACL: 'public-read'
}))

app.get('/sign', function(req, res) {
  console.log('req query', req.query)
  var fileName = 'key';
  var response = { fileName: fileName }; // object to be sent back
  var videoType = req.query.video;
  var audioType = req.query.audio;
  var s3 = new AWS.S3();
  var s3_params = {
    Bucket: 'recordrtc-test',
    Key: fileName + '.webm',
    ContentType: videoType,
    ACL: 'public-read'
  };

  // get signed url for video
  s3.getSignedUrl('putObject', s3_params, function(err, videoData) {
    if(err) {
      console.log('getSignedUrl error: ', err);
      return res.send(500, "Cannot create s3 video signed URL");
    }
    response.videoSignedUrl = videoData;
    // if audio and video recorded separately, get audio signed url as well
    if(audioType) {
      s3_params.ContentType = audioType;
      s3_params.Key = fileName+'.wav';
      s3.getSignedUrl('putObject', s3_params, function(err, audioData) {
        if(err) {
          console.log('getSignedUrl error: ', err);
          return res.send(500, "Cannot create s3 audio signed URL");
        }
        response.audioSignedUrl = audioData;
        res.send(response);
      })
    } else {
      res.send(response);
    }
  }) 
})



app.get('/test', function(req, res) {
  console.log('req query', req.query);

  var params = {
    Bucket: 'recordrtc-test',
    Key: 'test',
    ContentType: 'text/html'
  }

  s3.getSignedUrl('putObject', params, function(err, data) {
    if(err) console.log('error: ', err);
    console.log(data);
    res.send(data)
  })
})



/** SERVE **/

app.use('/', express.static(path.join(__dirname, '/build')));
app.use('/assets', express.static(path.join(__dirname, '/src/assets')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/src/index.html'));
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Listening on port', port);


