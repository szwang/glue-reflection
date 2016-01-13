import React from 'react';
import styles from '../../styles/recorder.css';
import RecorderActionCreators from '../actions/RecorderActionCreators';

class GlueVideo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }

    this.clickPlay = this.clickPlay.bind(this);
  }

  clickPlay() {
    RecorderActionCreators.clickPlay();
    console.log('video? ', document.getElementById('glueStream'))   
    document.getElementById('glueStream').play();
    document.getElementById('playButton').hide();
  }

  render() {
    return (
      <div className={styles.vidContainer}>
        <video id="glueStream">
          <source src="https://s3.amazonaws.com/recordrtc-test/sample-vids/Turkey_On_The_Run.mp4"
                  type="video/mp4" />
        </video>
        <button id="playButton" onClick={this.clickPlay}>
          <img className={styles.playImg} src="http://www.clipartbest.com/cliparts/KTj/gk8/KTjgk8MEc.png"/>
        </button>
      </div>
    )
  } 
}

module.exports = GlueVideo;
