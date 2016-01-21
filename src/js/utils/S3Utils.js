/**
 * Taken and heavily modified from React S3 Uploader
 **/

import UploadActionCreators from '../actions/UploadActionCreators';

function S3Upload(options) {
  for (var option in options) {
    if (options.hasOwnProperty(option)) {
      this[option] = options[option];
    }
  }

  this.uploadFile(options);
}

S3Upload.prototype.signingUrl = '/s3/sign';

S3Upload.prototype.createCORSRequest = function(method, url) {
  var xhr = new XMLHttpRequest();

  if (xhr.withCredentials != null) {
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest !== "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }

  return xhr;
};

S3Upload.prototype.getSignedUrl = function(file, callback) {
  let id = Math.floor(Math.random()*90000) + 10000;
  let queryString = '?objectName=' + id + '&contentType=' + encodeURIComponent(file.type);
  let xhr = this.createCORSRequest('GET', this.signingUrl + queryString);

  xhr.overrideMimeType && xhr.overrideMimeType('text/plain; charset=x-user-defined');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var result;
      try {
        result = JSON.parse(xhr.responseText);
      } catch (error) {
        this.onError('Invalid signing server response JSON: ' + xhr.responseText, file);
        return false;
      }
      return callback(result);
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      return this.onError('Could not contact request signing server. Status = ' + xhr.status, file);
    }
  }.bind(this);

  return xhr.send();
};

S3Upload.prototype.uploadToS3 = function(file, signResult) {
  console.log('signResult', signResult);
  var xhr = this.createCORSRequest('PUT', signResult.signedUrl);
  
  if (!xhr) {
    this.onError('CORS not supported', file);
  } else {
    xhr.onload = function() {
      if (xhr.status === 200) {
        this.onProgress(100, 'Upload completed', file);
        return this.onFinishS3Put(signResult, file);
      } else {
        return this.onError('Upload error: ' + xhr.status, file);
      }
    }.bind(this);
    xhr.onerror = function() { //TODO: create render function if error occurs
      return this.onError('XHR error', file);
    }.bind(this);
    xhr.upload.onprogress = function(e) {
      var percentLoaded;
      if (e.lengthComputable) {
        percentLoaded = Math.round((e.loaded / e.total) * 100);
        if(file.type === 'video/webm') { // only render result of vid upload to user
          UploadActionCreators.uploadFile(percentLoaded, signResult);
        }
        return this.onProgress(percentLoaded, percentLoaded === 100 ? 'Finalizing' : 'Uploading', file);
      }
    }.bind(this);
  }

  xhr.setRequestHeader('Content-Type', file.type);
  xhr.setRequestHeader('x-amz-acl', 'public-read');

  this.httprequest = xhr;

  return xhr.send(dataURItoBlob(file.data));
};

S3Upload.prototype.uploadFile = function(file) { //inputs are base64
  var uploadObj;
  console.log('in upload file! parameters: ', file)

  return this.getSignedUrl(file, function(signResult) {
    return this.uploadToS3(file, signResult);
  }.bind(this));
};

S3Upload.prototype.abortUpload = function() {
  this.httprequest && this.httprequest.abort();
};

S3Upload.prototype.onFinishS3Put = function(signResult, file) {
    return console.log('finished upload! public url: ', signResult.publicUrl);
};

S3Upload.prototype.onProgress = function(percent, status, file) {
    return console.log('uploading!', percent + '% done.');
};

S3Upload.prototype.onError = function(status, file) {
    return console.log('upload error: ', status);
};

function dataURItoBlob(dataURI) {
  var binary = atob(dataURI.split(',')[1]);
  var array = [];
  for(var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)]);
}

module.exports = S3Upload;
