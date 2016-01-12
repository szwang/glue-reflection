var startRecording = document.getElementById('start-recording');
var stopRecording = document.getElementById('stop-recording');
var cameraPreview = document.getElementById('camera-preview');

var audio = document.querySelector('audio');

var isFirefox = !!navigator.mozGetUserMedia;

var recordAudio, recordVideo;

// function to start recording
startRecording.onclick = function() {
  //disable start recording button
  startRecording.disabled = true;

  //begin showing stream and recording
  navigator.getUserMedia({
          audio: true,
          video: true
      }, function(stream) {
          // show cam
          cameraPreview.src = window.URL.createObjectURL(stream);
          //video.play
          cameraPreview.play();

          // use recordrtc api for stream
          recordAudio = RecordRTC(stream, {
              bufferSize: 16384
          });

          //if not firefox, make a stream for video

          if (!isFirefox) {
              recordVideo = RecordRTC(stream, {
                  type: 'video'
              });
          }

          //call the startRecording method on recordrtc

          recordAudio.startRecording();

          // if not firefox, start recording video as well

          if (!isFirefox) {
              recordVideo.startRecording();
          }

          // make the stop recording button clickable
          stopRecording.disabled = false;

      }, function(error) {

          // if error, alert
          alert(JSON.stringify(error));
      });
};

// function to stop recording
stopRecording.onclick = function() {

  // change button enablements 
  startRecording.disabled = false;
  stopRecording.disabled = true;

  // call stop recording on recordaudio
  recordAudio.stopRecording(function() {
      if (isFirefox) onStopRecording();
  });

  //if not firefox, stop recording vid stream as well
  if (!isFirefox) {
      recordVideo.stopRecording();
      onStopRecording();
  }

  // when done, call this func. we grab the data url(s) and post them to the server
  function onStopRecording() {
      recordAudio.getDataURL(function(audioDataURL) {
          if (!isFirefox) {
              recordVideo.getDataURL(function(videoDataURL) {
                  postFiles(audioDataURL, videoDataURL);
              });
          } else postFiles(audioDataURL);
      });
  }
};

var fileName;

//called in onStopRecording
function postFiles(audioDataURL, videoDataURL) {
  // set filename to random string
  fileName = getRandomString();
  //initialize files as array
  var files = { };

  //grab info for audio
  files.audio = {
      name: fileName + (isFirefox ? '.webm' : '.wav'),
      type: isFirefox ? 'video/webm' : 'audio/wav',
      contents: audioDataURL
  };

  // if not firefox, grab info for video as well
  if (!isFirefox) {
      files.video = {
          name: fileName + '.webm',
          type: 'video/webm',
          contents: videoDataURL
      };
  }

  //pass in bool for firefox
  files.isFirefox = isFirefox;

  //make cam container blank
  cameraPreview.src = '';
  //show loader instead
  cameraPreview.poster = '/ajax-loader.gif';

  //post to upload route
  xhr('/upload', JSON.stringify(files), function(_fileName) {
      var href = location.href.substr(0, location.href.lastIndexOf('/') + 1);
      cameraPreview.src = href + 'uploads/' + _fileName;
      cameraPreview.play();

      //show link
      var h2 = document.createElement('h2');
      h2.innerHTML = '<a href="' + cameraPreview.src + '">' + cameraPreview.src + '</a>';
      document.body.appendChild(h2);
  });
}

function xhr(url, data, callback) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
          callback(request.responseText);
      }
  };
  request.open('POST', url);
  request.send(data);
}

window.onbeforeunload = function() {
  startRecording.disabled = false;
};

function getRandomString() {
  if (window.crypto) {
      var a = window.crypto.getRandomValues(new Uint32Array(3)),
          token = '';
      for (var i = 0, l = a.length; i < l; i++) token += a[i].toString(36);
      return token;
  } else {
      return (Math.random() * new Date().getTime()).toString(36).replace( /\./g , '');
  }
}