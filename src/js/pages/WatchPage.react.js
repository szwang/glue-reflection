import React from 'react';
import _ from 'lodash';
import { Modal, ProgressBar } from 'react-bootstrap';
import RecordRTC from 'recordrtc';
import Firebase from 'firebase';
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
      uploadPercent: null,
      vidSrc: "https://s3.amazonaws.com/recordrtc-test/sample-vids/Cat+Jump+Fail+with+Music-+Sail+by+AWOLNATION.mp4"
    }

    this.closeUploadModal = this.closeUploadModal.bind(this);
    this.clickPlay = this.clickPlay.bind(this);
    this.playVid = this.playVid.bind(this);
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.onStopRecording = this.onStopRecording.bind(this);
    this.setUploadProgress = this.setUploadProgress.bind(this);
  }

  componentWillMount() {
    this.firebaseRef = new Firebase('https://reactionwall.firebaseio.com/videos/sail-cat/reactions');
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
      // console.log('play vid')
      document.getElementById('glueStream').play(); 
    }
  }

  startRecord() {
    var videoConfig = {
      disableLogs: true,
      video: { height: 480, width: 640 },
      canvas: { height: 480, width: 640 }
    };
    var audioConfig = { disableLogs: true, bufferSize: 16384 };

    if(RecorderStore.getRecordStatus) {
      return new Promise((resolve, reject) => {
        captureUserMedia((stream) => {
          if(isFirefox) {
            this.state.recordAudio = RecordRTC(stream, { disableLogs: true });
            this.state.recordAudio.startRecording();
          } else {
            this.state.recordAudio = RecordRTC(stream, audioConfig);
            videoConfig.type = 'video';
            this.state.recordVideo = RecordRTC(stream, videoConfig);
            this.state.recordVideo.initRecorder(() => {
              this.state.recordAudio.initRecorder(() => {
                this.state.recordVideo.startRecording();
                this.state.recordAudio.startRecording();
              })
            })
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

    this.setState({ showUploadModal: true, uploadPercent: 15 });

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
      var id = Math.floor(Math.random()*90000) + 10000;
      if(!isFirefox) {
        this.state.recordVideo.getDataURL((videoDataURL) => {
          new S3Upload({ type: 'audio/wav', data: audioDataURL, id: id });
          new S3Upload({ type: 'video/webm', data: videoDataURL, id: id });
        })
      } else {
        new S3Upload({ type: 'video/webm', data: audioDataURL, id: id });
      }
    })
  }

  setUploadProgress() {
    var uploadPercent = UploadStore.getUploadPercent();
    this.setState({ uploadPercent: uploadPercent  + 15 })
    if(uploadPercent === 100) {
      this.closeUploadModal();
      var id = UploadStore.getTaskId();
      this.setState({ 
        taskID: id, 
        showResponseModal: true,
        uploadSuccess: true 
      })
      var newReactionRef = this.firebaseRef.push();
      newReactionRef.set({
        id: id, 
        link: 'https://s3.amazonaws.com/recordrtc-test/' + id + '.webm'
      })
    }
  }

  render() {
    return (
      <div>
        <Video 
          stopRecord={this.stopRecord} 
          playVid={this.state.playVid} 
          showPlayButton={this.state.showPlayButton} 
          src={this.state.vidSrc} 
          clickPlay={this.clickPlay} />
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
