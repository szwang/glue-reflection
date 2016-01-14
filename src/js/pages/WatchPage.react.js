import React from 'react';
import Recorder from '../components/Recorder.react';
import Video from '../components/GlueVideo.react';
import styles from '../../styles/recorder.css';
import { Modal } from 'react-bootstrap';
import RecorderStore from '../stores/RecorderStore';

class WatchPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      videoUploading: false,
      showUploadModal: false
    }

    this.checkUploadStatus = this.checkUploadStatus.bind(this);
  }

  componentDidMount() {
    RecorderStore.addChangeListener(this.checkUploadStatus);
  }

  componentWillUnmount() {
    RecorderStore.removeChangeListener(this.checkUploadStatus);
  }

  checkUploadStatus() {
    this.setState({ showUploadModal: RecorderStore.getUploadStatus() })
  }

  render() {
    return (
      <div>
        <Video />
        <Recorder />
        <Modal show={this.state.showUploadModal} onHide={this.close}>
          <img className={styles.uploadGif} src="/assets/ajax-loader.gif" /> 
        </Modal>
      </div>
    )
  } 
}

module.exports = WatchPage;
