import React from 'react';
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
    this.prepareData = this.prepareData.bind(this);

  }

  componentDidMount() {
    RecorderStore.addUploadListener(this.checkUploadStatus);
    RecorderStore.addPlayListener(this.playVid);
    RecorderStore.addChangeListener(this.startRecord);
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
    if(RecorderStore.getRecordStatus()) {
      return new Promise((resolve, reject) => {
        captureUserMedia((stream) => {
          this.setState({ mediaStream: stream });

          //set RecordRTC object and handle browser cases
          this.state.recordAudio = RecordRTC(stream, { 
            bufferSize: 16384,
            canvas: {
               width: 640,
               height: 480
            },
            video: {
              width: 640,
              height: 480
            }         
          });

          if(!isFirefox) {
            this.state.recordVideo = RecordRTC(stream, { 
              type: 'video',
              bufferSize: 16384,
              canvas: {
                 width: 640,
                 height: 480
              },
              video: {
                width: 640,
                height: 480
              }            

            });
          }
          //begin recording
          this.state.recordAudio.startRecording();
          if(!isFirefox) {
            this.state.recordVideo.startRecording();
          }
          resolve();
        })
      })
      .then(() => {
        console.log('begin record')
        RecorderActionCreators.playVid(true); //once recording begins, video begins playing
      })
    }

  }

  stopRecord() {
    document.getElementById('glueStream').removeEventListener('ended', this.stopRecord);
    RecorderActionCreators.beginUpload(true); // status of the upload lives in RecorderStore
    RecorderActionCreators.playVid(false);
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

  render() {
    return (
      <div>
        <Video stopRecord={this.stopRecord} playVid={this.state.playVid} showPlayButton={this.state.showPlayButton} clickPlay={this.clickPlay} />
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
