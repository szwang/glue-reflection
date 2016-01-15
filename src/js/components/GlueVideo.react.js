import React from 'react';
import styles from '../../styles/recorder.css';
import RecorderActionCreators from '../actions/RecorderActionCreators';

var buttonStyle = { display: 'block' };

class GlueVideo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.vidContainer}>
        <video id="glueStream">
          <source src="https://s3.amazonaws.com/recordrtc-test/sample-vids/Turkey_On_The_Run.mp4"
                  type="video/mp4" />
        </video>
        {this.props.showPlayButton ? 
            <img onClick={this.props.clickPlay} className={styles.playImg} src="/assets/playButton.png"/> : 
          null }
      </div>
    )
  } 
}

module.exports = GlueVideo;
