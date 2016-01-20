import S3Store from '../stores/S3Store';
import 'aws-sdk/dist/aws-sdk';
const AWS = window.AWS;

export function captureUserMedia(callback) {
  var params = {
    audio: true,
    video: true
  };

  navigator.getUserMedia(params, callback, (error) => {
    alert(JSON.stringify(error));
  });

};

export function prepareData(audioDataURL, videoDataURL) {
  console.log('audioDataURL: ', audioDataURL);
  console.log('videoDataURL: ', videoDataURL);
  return new Promise((resolve, reject) => {
    let files = {};
    let id = Math.floor(Math.random()*90000) + 10000;

    if(videoDataURL) {
      files.video = {
          name: id + '.webm',
          type: 'video/webm',
          contents: videoDataURL
      }
    }

    files.audio = {
      name: id + (!videoDataURL ? '.webm' : '.wav'), //if only one parameter, then it's a webm file
      type: !videoDataURL ? 'video/webm' : 'audio/wav',
      contents: audioDataURL
    }

    files.name = id;

    resolve(files);
  })
};

export function uploadToS3(audioData, videoData) {
  console.log('video url:', S3Store.getUrlData().videoUrl)
  console.log('data: ', {audioData: audioData, videoData: videoData})
  var urls = S3Store.getUrlData();
  if(videoData) { // if video and audio are separate
    fetch(urls.audioUrl, { // send .wav audio
      method: 'put',
      Body: 'audioData',
      Headers: {
        ACL: 'public-read',
        'Content-Type': 'audio/wav',
        'Content-Disposition': 'base-64'
      }
    })
    .then((stuff) => console.log(stuff))
    .then((stuff) => console.log(stuff))
    .catch((err) => console.log(err))

    fetch(urls.videoUrl, { // send .webm video
      method: 'PUT',
      data: videoData,

    })
    .catch((err) => console.log(err))

  } else { // if not separate (ie using Firefox)
    fetch(urls.videoUrl, { // send .webm video
      method: 'PUT',
      data: audioData // first parameter
    })
    .catch((err) => console.log(err))

  }
}

export function testUpload(data) {
  fetch('', {
    method: 'put',
    Body: data
  }).then((stuff) => console.log(stuff))
  .catch((err) => console.log(err))
}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();

    if (xhr.withCredentials != null) {
        xhr.open(method, url, true);
    }
    else if (typeof XDomainRequest !== "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    }
    else {
        xhr = null;
    }
    return xhr;
};

// export function uploadToS3(audioData, videoData) {
//   var urls = S3Store.getUrlData();
//   var xhr = createCORSRequest('PUT', urls.audioUrl);
//   if (!xhr) {
//   } else {
//       xhr.onload = function() {
//           if (xhr.status === 200) {
//               // this.onProgress(100, 'Upload completed', audioData);
//               return this.onFinishS3Put(signResult, audioData);
//           } else {
//               // return this.onError('Upload error: ' + xhr.status, audioData);
//           }
//       };
//       xhr.onerror = function() {
//           // return this.onError('XHR error', audioData);
//       }
//       xhr.upload.onprogress = function(e) {
//           var percentLoaded;
//           if (e.lengthComputable) {
//               percentLoaded = Math.round((e.loaded / e.total) * 100);
//               // return this.onProgress(percentLoaded, percentLoaded === 100 ? 'Finalizing' : 'Uploading', audioData);
//           }
//       }
//   }
//   xhr.setRequestHeader('Content-Type', audioData.type);
  
//   xhr.setRequestHeader('x-amz-acl', 'private');
//   return xhr.send(audioData);
// }

