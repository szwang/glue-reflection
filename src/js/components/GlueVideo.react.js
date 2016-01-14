import React from 'react';
import styles from '../../styles/recorder.css';
import RecorderActionCreators from '../actions/RecorderActionCreators';

var buttonStyle = { display: 'block' };

class GlueVideo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showPlayButton: true
    }

    this.clickPlay = this.clickPlay.bind(this);
  }

  clickPlay() {
    RecorderActionCreators.clickPlay();
    document.getElementById('glueStream').play();
    this.setState({ showPlayButton: false })
  }

  render() {
    return (
      <div className={styles.vidContainer}>
        <video id="glueStream">
          <source src="https://s3.amazonaws.com/recordrtc-test/sample-vids/Turkey_On_The_Run.mp4"
                  type="video/mp4" />
        </video>
        {this.state.showPlayButton ? 
          <button onClick={this.clickPlay}>
            <img className={styles.playImg} src="http://www.clipartbest.com/cliparts/KTj/gk8/KTjgk8MEc.png"/>
          </button> : 
          null }
      </div>
    )
  } 
}

module.exports = GlueVideo;
