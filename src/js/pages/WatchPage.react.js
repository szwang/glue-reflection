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
    this.closeUploadModal = this.closeUploadModal.bind(this);
  }

  componentDidMount() {
    RecorderStore.addUploadListener(this.checkUploadStatus);
  }

  componentWillUnmount() {
    RecorderStore.removeUploadListener(this.checkUploadStatus);
  }

  checkUploadStatus() {
    this.setState({ showUploadModal: RecorderStore.getUploadStatus() })
  }

  closeUploadModal() {
    this.setState({ showUploadModal: false });
  }

  render() {
    return (
      <div>
        <Video />
        <Recorder />
        <Modal show={this.state.showUploadModal} onHide={this.closeUploadModal}>
          <Modal.Header>
          Uploading your video
          </Modal.Header>
          <Modal.Body>
          <img className={styles.uploadGif} src="/assets/ajax-loader.gif" /> 
          </Modal.Body>
        </Modal>
      </div>
    )
  } 
}

module.exports = WatchPage;
