import React from 'react';
import styles from '../../styles/recorder.css';

class GlueVideo extends React.Component {
  render() {
    return (
      <div className={styles.vidContainer}>
        <video autoPlay loop>
          <source src="https://s3.amazonaws.com/recordrtc-test/sample-vids/Turkey_On_The_Run.mp4"
                  type="video/mp4" />
        </video>
      </div>
    )
  } 
}

module.exports = GlueVideo;
