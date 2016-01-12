import React from 'react';
import RecordRTC from 'recordrtc';
import { captureUserMedia } from '../utils/RecorderUtils';

class Recorder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaStream: null,
      src: null
    }

    this.startRecord = this.startRecord.bind(this);
  }

  startRecord() {
    const isFirefox = !!navigator.mozGetUserMedia;
    var recordAudio, recordVideo;

    captureUserMedia((stream) => {
      this.setState({ mediaStream: stream });
      this.setState({ src: window.URL.createObjectURL(stream) });

      //set RecordRTC object and handle browser cases
      recordAudio = RecordRTC(stream, { bufferSize: 16384 });
      if(!isFirefox) {
        recordVideo = RecordRTC(stream, { type: 'video' });
      }

      //begin recording
      recordAudio.startRecording();
      if(!isFirefox) {
        recordVideo.startRecording();
      }
    })
  }

  render() {
    return (
      <div>
        <div>
          <video src={this.state.src} autoPlay muted/>
        </div>
        <div>
          <button onClick={this.startRecord}>Start Recording</button>
          <button onClick={this.stopRecord}>Stop Recording</button>
        </div>
      </div>
    )
  }
}

export default Recorder;
