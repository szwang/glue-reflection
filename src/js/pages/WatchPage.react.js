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

class WatchPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showUploadModal: false,
      showResponseModal: false,
      uploadSuccess: false,
      taskID: null,
      showPlayButton: true,
      recordVideo: null,
      playVid: false,
      mediaStream: null,
      uploadPercent: null,
      vidSrc: null
    }

    this.closeUploadModal = this.closeUploadModal.bind(this);
    this.clickPlay = this.clickPlay.bind(this);
    this.playVid = this.playVid.bind(this);
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.onStopRecording = this.onStopRecording.bind(this);
    this.setUploadProgress = this.setUploadProgress.bind(this);
    this.getSource = this.getSource.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    RecorderStore.addPlayListener(this.playVid);
    RecorderStore.addChangeListener(this.startRecord);
    UploadStore.addChangeListener(this.setUploadProgress);
    
    this.getSource(this.props.params.video);
  }

  componentWillUnmount() {
    RecorderStore.removePlayListener(this.playVid);
    RecorderStore.removeChangeListener(this.startRecord);
    UploadStore.removeChangeListener(this.setUploadProgress);
  }

  getSource(vidName) {
    return new Promise((resolve, reject) => {
      var firebaseRef = new Firebase('https://reactionwall.firebaseio.com/videos/' + vidName + '/src');
      firebaseRef.on('value', (snapshot) => {
        resolve(snapshot.val());
      })
    })
    .then((src) => {
      this.setState({ vidSrc: src })
    })
  }

  closeUploadModal() {
    this.setState({ showUploadModal: false });
  }

  clickPlay() {
    RecorderActionCreators.clickPlay(true);
    this.setState({ showPlayButton: false })
  }

  playVid() {
    this.setState({ playVid: RecorderStore.getPlayStatus() });
    if(this.state.playVid) {
      console.log('going to play video')
      document.getElementById('glueStream').play(); 
      document.getElementById('glueStream').addEventListener('ended', this.stopRecord);
    }
  }

  startRecord() {
    var videoConfig = {
      disableLogs: true,
      type: 'video',
      video: { height: 480, width: 640 },
      canvas: { height: 480, width: 640 }
    };

    if(RecorderStore.getRecordStatus) {
      return new Promise((resolve, reject) => {
        captureUserMedia((stream) => {
          this.state.recordVideo = RecordRTC(stream, videoConfig);
          this.state.recordVideo.startRecording();
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

    this.state.recordVideo.stopRecording(this.onStopRecording)
  }

  onStopRecording() {
    var id = Math.floor(Math.random()*90000) + 10000;
    this.state.recordVideo.getDataURL((videoDataURL) => {
      new S3Upload({ type: 'video/webm', data: videoDataURL, id: id });
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
      var firebaseRef = new Firebase('https://reactionwall.firebaseio.com/videos/' + this.props.params.video + '/reactions');
      var newReactionRef = firebaseRef.push();
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
          clickPlay={this.clickPlay}
          vidName={this.props.params.video} />
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
