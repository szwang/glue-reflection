import React from 'react';
import Recorder from '../components/Recorder.react';
import Video from '../components/GlueVideo.react';
import styles from '../../styles/recorder.css';
import { Modal, ProgressBar } from 'react-bootstrap';
import RecorderStore from '../stores/RecorderStore';
import RecordRTC from 'recordrtc';
import ResponseModal from '../components/ResponseModal.react';
import { captureUserMedia, onStopRecording } from '../utils/RecorderUtils';
import RecorderActionCreators from '../actions/RecorderActionCreators';

const isFirefox = !!navigator.mozGetUserMedia;

class WatchPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      videoUploading: false,
      showUploadModal: false,
      showResponseModal: false,
      uploadSuccess: false,
      taskID: null,
      showPlayButton: true,
      playVid: false
    }

    this.checkUploadStatus = this.checkUploadStatus.bind(this);
    this.closeUploadModal = this.closeUploadModal.bind(this);
    this.closeResponseModal = this.closeResponseModal.bind(this);
    this.clickPlay = this.clickPlay.bind(this);

  }

  componentDidMount() {
    RecorderStore.addUploadListener(this.checkUploadStatus);
    RecorderStore.addPlayListener(this.playVid);
  }

  componentWillUnmount() {
    RecorderStore.removeUploadListener(this.checkUploadStatus);
    RecorderStore.removePlayListener(this.playVid);
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

  clickPlay() {
    RecorderActionCreators.clickPlay();
    this.setState({ showPlayButton: false })
  }


  render() {
    return (
      <div>
        <Video playVid={this.state.playVid} showPlayButton={this.state.showPlayButton} clickPlay={this.clickPlay} />
        <Recorder />
        <div className={styles.modals}>
          <Modal show={this.state.showUploadModal} onHide={this.closeUploadModal}>
            <Modal.Header>
              <div className={styles.uploadTitle}>Uploading your video</div>
            </Modal.Header>
            <Modal.Body>
              <ProgressBar active now={100} />
            </Modal.Body>
          </Modal>
        </div>
        <div className={styles.modals}>
          <ResponseModal 
            show={this.state.showResponseModal} 
            hide={this.closeResponseModal}
            success={this.state.uploadSuccess}
            taskID={this.state.taskID} />
          </div>
      </div>
    )
  } 
}

module.exports = WatchPage;
