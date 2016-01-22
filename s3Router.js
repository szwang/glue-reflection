
// middleware handler for getting s3 signed url

var  aws = require('aws-sdk'),
     express = require('express');


function checkTrailingSlash(path) {
  if (path && path[path.length-1] != '/') {
    path += '/';
  }
  return path;
}

function S3Router(options) {

  var S3_BUCKET = options.bucket,
    getFileKeyDir = options.getFileKeyDir || function() { return ""; };

  if (!S3_BUCKET) {
    throw new Error("S3_BUCKET is required.");
  }

  var s3Options = {};
  if (options.region) {
    s3Options.region = options.region;
  }

  var router = express.Router();

  /**
   * Redirects image requests with a temporary signed URL, giving access
   * to GET an upload.
   */
  function tempRedirect(req, res) {
    var params = {
      Bucket: S3_BUCKET,
      Key: checkTrailingSlash(getFileKeyDir(req)) + req.params[0]
    };
    var s3 = new aws.S3(s3Options);
    s3.getSignedUrl('getObject', params, function(err, url) {
      res.redirect(url);
    });
  };

  function findType(string) {
    var n = string.lastIndexOf('/');
    return string.substring(n+1);
  }

  /**
   * Image specific route.
   */
  router.get(/\/img\/(.*)/, function(req, res) {
    console.log('img redirect')
    return tempRedirect(req, res);
  });

  /**
   * Other file type(s) route.
   */
  router.get(/\/uploads\/(.*)/, function(req, res) {
    console.log('upload redirect')
    return tempRedirect(req, res);
  });

  /**
   * Returns an object with `signedUrl` and `publicUrl` properties that
   * give temporary access to PUT an object in an S3 bucket.
   */
  router.get('/sign', function(req, res) {
    var filename = req.query.objectName;
    var mimeType = req.query.contentType;
    var ext = '.' + findType(mimeType);
    console.log(ext)
    var fileKey = checkTrailingSlash(getFileKeyDir(req)) + filename + ext;
    // Set any custom headers
    if (options.headers) {
      res.set(options.headers);
    }

    var s3 = new aws.S3(s3Options);
    var params = {
      Bucket: S3_BUCKET,
      Key: fileKey,
      Expires: 600,
      ContentType: mimeType,
      ACL: options.ACL || 'private'
    };

    s3.getSignedUrl('putObject', params, function(err, data) {
      if (err) {
        console.log(err);
        return res.send(500, "Cannot create S3 signed URL");
      }
      res.json({
        signedUrl: data,
        publicUrl: 'https://s3.amazonaws.com/recordrtc-test/' + fileKey,
        filename: filename
      });
    });
  });

  return router;
}

module.exports = S3Router;
