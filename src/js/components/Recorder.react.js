import React from 'react';
import RecordRTC from 'recordrtc';
import { captureUserMedia } from '../utils/RecorderUtils';

class Recorder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaStream: null
    }

    this.startRecord = this.startRecord.bind(this);
  }

  startRecord() {
    captureUserMedia((stream) => {
      this.state.mediaStream = stream;

      this.state.src = window.URL.createObjectURL(stream);

    })
  }

  render() {
    return (
      <div>
        <div>
          <video autoplay muted="true" controls="false"/>
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
