import React from 'react';
import RecordRTC from 'recordrtc';
import { captureUserMedia, onStopRecording } from '../utils/RecorderUtils';
import RecorderActionCreators from '../actions/RecorderActionCreators';
import styles from '../../styles/home.css';
import RecorderStore from '../stores/RecorderStore';

const isFirefox = !!navigator.mozGetUserMedia;

function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

// this is the stateful component displaying the recording of the user
class Webcam extends React.Component {
  constructor(props) {
    super(props);

    this.state = { src: null };

    this.requestUserMedia = this.requestUserMedia.bind(this);
  }

  componentDidMount() {
    if(!hasGetUserMedia()) {
      alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
      return;
    }
    this.requestUserMedia();
  }

  requestUserMedia() {
    captureUserMedia((stream) => {
      this.setState({ src: window.URL.createObjectURL(stream) });
    });
  }

  render() {
    return (
      <div>
        <video style={this.props.size} className={this.props.className} src={this.state.src} autoPlay muted/>
      </div>
    )
  }
}

export default Webcam;

