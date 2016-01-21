import React from 'react';
import _ from 'lodash';
import { Modal, ProgressBar } from 'react-bootstrap';
import RecordRTC from 'recordrtc';
import { captureUserMedia } from '../utils/RecorderUtils';
import S3Upload from '../utils/S3Utils';
import styles from '../../styles/recorder.css';
import RecorderStore from '../stores/RecorderStore';
import RecorderActionCreators from '../actions/RecorderActionCreators';
import Video from '../components/GlueVideo.react';
import ResponseModal from '../components/ResponseModal.react';
import UploadModal from '../components/UploadModal.react';
import S3Store from '../stores/S3Store';
import Uploader from '../components/Uploader.react';
import UploadStore from '../stores/UploadStore';

const isFirefox = !!navigator.mozGetUserMedia;
const vidElement = document.getElementById('glueStream');

class WatchPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showUploadModal: false,
      showResponseModal: false,
      uploadSuccess: false,
      taskID: null,
      showPlayButton: true,
      recordAudio: null,
      recordVideo: null,
      playVid: false,
      mediaStream: null,
      uploadPercent: null
    }

    this.closeUploadModal = this.closeUploadModal.bind(this);
    this.clickPlay = this.clickPlay.bind(this);
    this.playVid = this.playVid.bind(this);
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.onStopRecording = this.onStopRecording.bind(this);
    this.setUploadProgress = this.setUploadProgress.bind(this);
  }

  componentDidMount() {
    RecorderStore.addPlayListener(this.playVid);
    RecorderStore.addChangeListener(this.startRecord);
    UploadStore.addChangeListener(this.setUploadProgress);

    document.getElementById('glueStream').addEventListener('ended', this.stopRecord);
  }

  componentWillUnmount() {
    RecorderStore.removePlayListener(this.playVid);
    RecorderStore.removeChangeListener(this.startRecord);
    UploadStore.removeChangeListener(this.setUploadProgress);
  }

  closeUploadModal() {
    this.setState({ showUploadModal: false });
  }

  // closeResponseModal() {
  //   this.setState({ showResponseModal: false });
  // }

  clickPlay() {
    RecorderActionCreators.clickPlay(true);
    this.setState({ showPlayButton: false })
  }

  playVid() {
    this.setState({ playVid: RecorderStore.getPlayStatus() });
    if(this.state.playVid) {
      console.log('play vid')
      document.getElementById('glueStream').play(); 
    }
  }

  startRecord() {
    if(RecorderStore.getRecordStatus) {
      return new Promise((resolve, reject) => {
        captureUserMedia((stream) => {
          var audioConfig = {};
          this.state.recordAudio = RecordRTC(stream, audioConfig);
          if(!isFirefox) {
            var videoConfig = {
              type: 'video'
            };
            this.state.recordVideo = RecordRTC(stream, videoConfig);
            this.state.recordVideo.initRecorder(() => {
              this.state.recordAudio.initRecorder(() => {
                this.state.recordVideo.startRecording();
                this.state.recordAudio.startRecording();
              })
            })
          } else {
            this.state.recordAudio.startRecording();
          }
          resolve();
        })
      })
      .then(() => {
        RecorderActionCreators.playVid(true);
      })
    }
  }

  stopRecord() {
    document.getElementById('glueStream').removeEventListener('ended', this.stopRecord);
    RecorderActionCreators.beginUpload(true); // status of the upload lives in RecorderStore
    RecorderActionCreators.playVid(false);

    this.setState({ showUploadModal: true });
    
    if(isFirefox) {
      this.state.recordAudio.stopRecording(this.onStopRecording);
    } else {
      this.state.recordAudio.stopRecording(() => {
        this.state.recordVideo.stopRecording(() =>{
          this.onStopRecording();
        })
      })
    }
  }

  onStopRecording() {
    this.state.recordAudio.getDataURL((audioDataURL) => { // if Firefox, 'audioDataURL' is webm
      if(!isFirefox) {
        this.state.recordVideo.getDataURL((videoDataURL) => {
          new S3Upload({ type: 'audio/wav', data: audioDataURL });
          new S3Upload({ type: 'video/webm', data: videoDataURL });
        })
      } else {
        new S3Upload({ type: 'video/webm', data: audioDataURL });
      }
    })
  }

  setUploadProgress() {
    this.setState({ uploadPercent: UploadStore.getUploadPercent() })
    if(this.state.uploadPercent === 100) {
      this.closeUploadModal();
      this.setState({ 
        taskID: UploadStore.getTaskId(), 
        showResponseModal: true,
        uploadSuccess: true 
      })
    }
  }

  render() {
    return (
      <div>
        <Video stopRecord={this.stopRecord} playVid={this.state.playVid} showPlayButton={this.state.showPlayButton} clickPlay={this.clickPlay} />
        <div className={styles.modals}>
          <UploadModal show={this.state.showUploadModal} onHide={this.closeUploadModal} percent={this.state.uploadPercent} />
        </div>
        <div>
          <ResponseModal show={this.state.showResponseModal} taskID={this.state.taskID} success={this.state.uploadSuccess} />
        </div>
      </div>
    )
  } 
}

module.exports = WatchPage;
