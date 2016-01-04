import React from 'react';

class Webcam extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var recorderConstraints = { audio: true, video: true };
    var chunks = [];  
    navigator.getUserMedia = (navigator.getUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia ||
                              navigator.webkitGetUserMedia);
  }

  onSuccess(stream) {
    var mediaRecorder = new MediaRecorder(stream);
    record.onclick = function() {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log('recorder started');
    }
    stop.onclick = function() {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log('recorder stopped');
    }
    mediaRecorder.onstop = function(e) {
      WebcamUtils.onStop(e);
    }
    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    }
  }

  onError(err) {
    console.log('An error occured: ', err);
  }

  onClick() {
    if(navigator.getUserMedia) {
      navigator.getUserMedia(recorderConstraints, onSuccess, onError)
    } else {
      console.log('getUserMedia is not supported');
    }
  }

  render() {
    return (
      <div>
      <button>Start record</button>
      </div>
    )
  }
}

export default Webcam;


