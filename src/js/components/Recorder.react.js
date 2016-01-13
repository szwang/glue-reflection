import React from 'react';
import RecordRTC from 'recordrtc';
import { captureUserMedia, onStopRecording } from '../utils/RecorderUtils';
import RecorderActionCreators from '../actions/RecorderActionCreators';
import styles from '../../styles/recorder.css';
import RecorderStore from '../stores/RecorderStore';

const isFirefox = !!navigator.mozGetUserMedia;

function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

// this is the stateful component displaying the recording of the user
class Recorder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mediaStream: null,
      src: null,
      recordAudio: null,
      recordVideo: null,
      hasUserMedia: false,
      userMediaRequested: false
    }

    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.onStopRecording = this.onStopRecording.bind(this);
    this.prepareData = this.prepareData.bind(this);
  }

  componentDidMount() {
    if(!hasGetUserMedia()) {
      alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
      return;
    }
    if(!this.state.hasUserMedia && !this.state.userMediaRequested) {
      this.requestUserMedia();
    }
    RecorderStore.addChangeListener(this.startRecord);
  }

  componentWillUnmount() {
    RecorderStore.removeChangeListener(this.startRecord);
  }

  requestUserMedia() {
    captureUserMedia((stream) => {
      this.setState({ src: window.URL.createObjectURL(stream) });
    })
  }

  startRecord() {
    captureUserMedia((stream) => {
      this.setState({ mediaStream: stream });

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

    setTimeout(() => {
      this.stopRecord();
    }, 5000);
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
    var fileName = Math.floor(Math.random()*90000) + 10000;

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
    files.name = fileName;

    RecorderActionCreators.postFiles(files);
  }

  render() {
    return (
      <div >
        <div>
          <video className={styles.recorder} src={this.state.src} autoPlay muted/>
        </div>
        <div>
          <button onClick={this.stopRecord}>Stop Recording</button>
        </div>
      </div>
    )
  }
}

export default Recorder;
