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
      src: null,
      hasUserMedia: false,
      userMediaRequested: false
    }

    this.requestUserMedia = this.requestUserMedia.bind(this);

  }

  componentDidMount() {
    if(!hasGetUserMedia()) {
      alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
      return;
    }
    if(!this.state.hasUserMedia && !this.state.userMediaRequested) {
      this.requestUserMedia();
      this.setState({hasUserMedia: true, userMediaRequested: true})
    }
  }

  requestUserMedia() {
    captureUserMedia((stream) => {
      this.setState({ src: window.URL.createObjectURL(stream) });
    })
  }

  render() {
    return (
      <div >
        <video className={styles.recorder} src={this.state.src} autoPlay muted/>
      </div>
    )
  }
}

export default Recorder;

