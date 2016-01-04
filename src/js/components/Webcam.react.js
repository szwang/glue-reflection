import React from 'react';
import WebcamUtils from '../utils/webcamUtils';

class WebcamButton extends React.Component {
  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  componentDidMount() {
    navigator.getUserMedia = (navigator.getUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia ||
                              navigator.webkitGetUserMedia);
  }

  onSuccess(stream) {
    this.setState({ mediaRecorder: new MediaRecorder(stream) });
    this.state.mediaRecorder.onstop = function(e) {
      WebcamUtils.onStop(e);
    }
    this.state.mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
      console.log('chunks: ', chunks);
    }
  }

  onError(err) {
    console.log('An error occured: ', err);
  }

  onStart() {
    var recorderConstraints = { video: true };
    if(navigator.getUserMedia) {
      this.state.mediaRecorder.start();
      console.log(this.state.mediaRecorder.state);
      console.log('recorder started');
      navigator.getUserMedia(recorderConstraints, this.onSuccess, this.onError);
    } else {
      console.log('getUserMedia is not supported');
    }
  }

  onStop() {
    this.state.mediaRecorder.stop();
    console.log(this.state.mediaRecorder.state);
    console.log('recorder stopped');
  }

  render() {
    return (
      <div>
        <button onClick={this.onStart}>Start record</button>
        <button onClick={this.onStop}>Stop record</button>
      </div>
    )
  }
}

export default WebcamButton;


