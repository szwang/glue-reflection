import React from 'react';
import _ from 'lodash';
import { Modal, ProgressBar } from 'react-bootstrap';
import RecordRTC from 'recordrtc';
import { captureUserMedia, uploadToS3 } from '../utils/RecorderUtils';
import styles from '../../styles/recorder.css';
import RecorderStore from '../stores/RecorderStore';
import RecorderActionCreators from '../actions/RecorderActionCreators';
import Video from '../components/GlueVideo.react';
import ResponseModal from '../components/ResponseModal.react';
import UploadModal from '../components/UploadModal.react';
import S3Store from '../stores/S3Store';
import Uploader from '../components/Uploader.react';

const isFirefox = !!navigator.mozGetUserMedia;
const vidElement = document.getElementById('glueStream');

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
      recordAudio: null,
      recordVideo: null,
      playVid: false,
      mediaStream: null
    }

    this.checkUploadStatus = this.checkUploadStatus.bind(this);
    this.closeUploadModal = this.closeUploadModal.bind(this);
    this.closeResponseModal = this.closeResponseModal.bind(this);
    this.clickPlay = this.clickPlay.bind(this);
    this.playVid = this.playVid.bind(this);
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.onStopRecording = this.onStopRecording.bind(this);
  }

  componentDidMount() {
    RecorderStore.addUploadListener(this.checkUploadStatus);
    RecorderStore.addPlayListener(this.playVid);
    RecorderStore.addChangeListener(this.startRecord);

    // get signed url(s) from AWS
    var content = { video: 'video/webm' };
    if(!isFirefox) content.audio = 'audio/wav';
    RecorderActionCreators.getSignedUrl(content);

    document.getElementById('glueStream').addEventListener('ended', this.stopRecord);
  }

  componentWillUnmount() {
    RecorderStore.removeUploadListener(this.checkUploadStatus);
    RecorderStore.removePlayListener(this.playVid);
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
          uploadToS3(audioDataURL, videoDataURL);
        })
      } else {
        uploadToS3(audioDataURL);
      }
    })
  }

  render() {
    return (
      <div>
      <Uploader
        signingUrl="/s3/sign" />
      </div>
    )
  } 
}

module.exports = WatchPage;
