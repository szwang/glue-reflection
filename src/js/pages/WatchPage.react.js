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

function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

class WatchPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      videoUploading: false,
      showUploadModal: false,
      showResponseModal: false,
      uploadSuccess: false,
      taskID: null,
      mediaStream: null,
      src: null,
      recordAudio: null,
      recordVideo: null,
      hasUserMedia: false,
      userMediaRequested: false,
      showPlayButton: true
    }

    this.checkUploadStatus = this.checkUploadStatus.bind(this);
    this.closeUploadModal = this.closeUploadModal.bind(this);
    this.closeResponseModal = this.closeResponseModal.bind(this);
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.onStopRecording = this.onStopRecording.bind(this);
    this.prepareData = this.prepareData.bind(this);
    this.requestUserMedia = this.requestUserMedia.bind(this);
    this.clickPlay = this.clickPlay.bind(this);

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
    RecorderStore.addUploadListener(this.checkUploadStatus);
  }

  componentWillUnmount() {
    RecorderStore.removeUploadListener(this.checkUploadStatus);
    RecorderStore.removeChangeListener(this.startRecord);
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
    }, 6000);
  }

  stopRecord() {
    RecorderActionCreators.beginUpload();
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

  clickPlay() {
    RecorderActionCreators.clickPlay();
    setTimeout(() => {
      document.getElementById('glueStream').play();
    }, 2000);
    this.setState({ showPlayButton: false })
  }


  render() {
    return (
      <div>
        <Video showPlayButton={this.state.showPlayButton} clickPlay={this.clickPlay} />
        <Recorder src={this.state.src} />
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
