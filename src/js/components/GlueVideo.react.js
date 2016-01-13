import React from 'react';
import styles from '../../styles/recorder.css';

class GlueVideo extends React.Component {
  render() {
    return (
      <div className={styles.vidContainer}>
        <video />
      </div>
    )
  } 
}

module.exports = GlueVideo;
