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

export function uploadToS3(audioDataURL, videoDataURL) {
  var s3 = new AWS.S3({params: {Bucket: 'recordrtc-test'}});

  RecorderActionCreators.getSignedUrl()
}