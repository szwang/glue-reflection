import React from 'react';
import RecordRTC from 'recordrtc';
import { captureUserMedia, onStopRecording } from '../utils/RecorderUtils';
import RecorderActionCreators from '../actions/RecorderActionCreators';

const isFirefox = !!navigator.mozGetUserMedia;

class Recorder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaStream: null,
      src: null,
      recordAudio: null,
      recordVideo: null
    }

    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.onStopRecording = this.onStopRecording.bind(this);
    this.prepareData = this.prepareData.bind(this);
  }

  startRecord() {
    captureUserMedia((stream) => {
      this.setState({ mediaStream: stream });
      this.setState({ src: window.URL.createObjectURL(stream) });

      //set RecordRTC object and handle browser cases
      this.state.recordAudio = RecordRTC(stream, { bufferSize: 16384 });
      if(!isFirefox) {
        this.state.recordVideo = RecordRTC(stream, { type: 'video' });
      }

      //begin recording
      this.state.recordAudio.startRecording();
      if(!isFirefox) {
        this.state.recordVideo.startRecording();
      }
    })
  }

  stopRecord() {
    this.state.recordAudio.stopRecording(() => {
      if(isFirefox) this.onStopRecording();
    })

    if(!isFirefox) {
      this.state.recordVideo.stopRecording(() => {
        this.onStopRecording();
      })
    }
  }

  onStopRecording() {
    this.state.recordAudio.getDataURL((audioDataURL) => {
      if(!isFirefox) {
        this.state.recordVideo.getDataURL((videoDataURL) => {
          this.prepareData(audioDataURL, videoDataURL);
        })
      } else {
        this.prepareData(audioDataURL);
      }
    })
  }

  prepareData(audioDataURL, videoDataURL) {
    var files = {};
    var fileName = 123;

    if(videoDataURL) {
      files.video = {
          name: fileName + '.webm',
          type: 'video/webm',
          contents: videoDataURL
      }
    }

    files.audio = {
      name: fileName + (isFirefox ? '.webm' : '.wav'),
      type: isFirefox ? 'video/webm' : 'audio/wav',
      contents: audioDataURL
    }

    files.isFirefox = isFirefox;

    RecorderActionCreators.postFiles(files);
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
