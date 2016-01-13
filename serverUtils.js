var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var AWS = require('aws-sdk');

if(process.env.NODE_ENV !== 'development') {
  var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
  var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
  var S3_BUCKET = process.env.S3_BUCKET;
}

AWS.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});

var s3 = new AWS.S3({
  params: { 
    Bucket: S3_BUCKET,
    ACL: 'public-read' 
  }
});

module.exports = {
  
  s3Upload: function(fileName, key) {
    console.log('uploading ', filename, key, ' to s3');

    var body = fs.createReadStream(fileName);

    s3.upload({
      Body: body,
      Key: key,
      ContentType: 'video/webm'
    })
    .on('httpUploadProgress', function(e) {
      console.log('upload in progress', e);
    })
    .send(function(err, data) {
      if(err) {
        console.log('error occurred: ', err);
      } else {
        console.log('upload success: ', data);
      }
    })
  },

  uploadToDisk: function(file) {
    var fileRootName = file.name.split('.').shift(),
        fileExtension = file.name.split('.').pop(),
        filePathBase = './uploads/',
        fileRootNameWithBase = filePathBase + fileRootName,
        filePath = fileRootNameWithBase + '.' + fileExtension,
        fileID = 2,
        fileBuffer;

    return new Promise(function(resolve, reject) {
      while (fs.existsSync(filePath)) {
          filePath = fileRootNameWithBase + '(' + fileID + ').' + fileExtension;
          fileID += 1;
      }    

      file.contents = file.contents.split(',').pop();
      fileBuffer = new Buffer(file.contents, "base64");
      fs.writeFileSync(filePath, fileBuffer);

      resolve(file.name); //TODO: figure out how to detect error
    })
  },

  merge: function(files) {
    var isWin = !!process.platform.match( /^win/ );

    if (isWin) {
      this.handleWin(files)
    } else {
      this.handleMac(files)
    }
  },

  handleWin: function(files) {
    console.log('merging on windows')

    var merger = __dirname + '\\merger.bat';
    var audioFile = __dirname + '\\uploads\\' + files.audio.name;
    var videoFile = __dirname + '\\uploads\\' + files.video.name;
    var mergedFile = __dirname + '\\uploads\\' + files.audio.name.split('.')[0] + '-merged.webm';

    var command = merger + ', ' + audioFile + " " + videoFile + " " + mergedFile + '';
    var fileName = files.audio.name.split('.')[0] + '-merged.webm'
    var key = files.audio.name.split('.')[0];
    
    return new Promise(function(resolve, reject) { //TODO rewrite promises with bluebird
      exec(command, function(error, stdout, stderr) {
        if(error) {
          console.log('error occurred');
          console.log(error.stack);
          reject(Error(error));
        } else {
          fs.unlink(audioFile);
          fs.unlink(videoFile);
          resolve(fileName, key);
        }
      })
    })
  },

  handleMac: function(files) {
    console.log('merging on mac');

    var audioFile = __dirname + '/uploads/' + files.audio.name;
    var videoFile = __dirname + '/uploads/' + files.video.name;
    var mergedFile = __dirname + '/uploads/' + files.audio.name.split('.')[0] + '-merged.webm';

    var util = require('util'),
        exec = require('child_process').exec;

    var command = "ffmpeg -i " + audioFile + " -i " + videoFile + " -map 0:0 -map 1:0 " + mergedFile;
    var fileName = files.audio.name.split('.')[0] + '-merged.webm'
    var key = files.audio.name.split('.')[0];

    return new Promise(function(resolve, reject) {
      exec(command, function(error, stdout, stderr) {
        if(stdout) console.log('stdout: ', stdout);
        if(stderr) console.log('stderr: ', stderr);

        if(error) {
          console.log('merging error: ', error);
          reject(Error(error));
        } else {
          resolve(fileName, key);
        }
      })
    })
  }
}








