import React from 'react';
import styles from '../../styles/recorder.css';

class GlueVideo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      vid: document.getElementById('glueStream')
    }

    this.clickPlay = this.clickPlay.bind(this);
  }

  clickPlay() {
    RecorderActionCreators.clickPlay();
    this.state.vid.play();    
  }

  render() {
    return (
      <div className={styles.vidContainer}>
        <video id="glueStream">
          <source src="https://s3.amazonaws.com/recordrtc-test/sample-vids/Turkey_On_The_Run.mp4"
                  type="video/mp4" />
        </video>
        <button onClick={this.clickPlay}>
          <img className={styles.playButton} src="http://www.clipartbest.com/cliparts/KTj/gk8/KTjgk8MEc.png"/>
        </button>
      </div>
    )
  } 
}

module.exports = GlueVideo;
