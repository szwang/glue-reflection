var fs = require('fs');
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
        filePathBase = config.upload_dir + '/',
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

      resolve(file.name);
    })
  },

  merge: function(files) {
    
  }
}