import React from 'react';
import Recorder from '../components/Recorder.react';
import Video from '../components/GlueVideo.react';
import styles from '../../styles/recorder.css';
import { Modal } from 'react-bootstrap';
import RecorderStore from '../stores/RecorderStore';
import ResponseModal from '../components/ResponseModal.react';

class WatchPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      videoUploading: false,
      showUploadModal: false,
      showResponseModal: false,
      uploadSuccess: false,
      taskID: null
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

  checkUploadStatus() { // checks stuff from the store and helps render UI
    let storeInfo = RecorderStore.getUploadStatus();
    this.setState({ showUploadModal: storeInfo.uploading })

    if(!storeInfo.uploading) { // if no longer uploading, show response modal
      if(storeInfo.uploadSuccess) {
        this.setState({ uploadSuccess: true, taskID: storeInfo.taskID });
      }
      this.setState({ showResponseModal: true });
    }
  }

  closeUploadModal() {
    this.setState({ showUploadModal: false });
  }

  closeResponseModal() {
    this.setState({ showResponseModal: false });
  }

  render() {
    return (
      <div>
        <Video />
        <Recorder />
        <Modal show={this.state.showUploadModal} onHide={this.closeUploadModal}>
          <Modal.Header>
            <div className={styles.uploadTitle}>Uploading your video</div>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.uploadGif}><img src="/assets/ajax-loader.gif" /> </div>
          </Modal.Body>
        </Modal>
        <ResponseModal 
          show={this.state.showResponseModal} 
          hide={this.closeResponseModal}
          success={this.state.uploadSuccess}
          taskID={this.state.taskID} />
      </div>
    )
  } 
}

module.exports = WatchPage;
