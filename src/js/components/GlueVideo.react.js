import React from 'react';
import styles from '../../styles/recorder.css';

class GlueVideo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.vidContainer}>
        <video id="glueStream">
          <source src="https://s3.amazonaws.com/recordrtc-test/sample-vids/Cat+Jump+Fail+with+Music-+Sail+by+AWOLNATION.mp4"
                  type="video/mp4" />
        </video>
        {this.props.showPlayButton ? 
            <img onClick={this.props.clickPlay} className={styles.playImg} src="http://www.clker.com/cliparts/j/W/O/s/N/o/windows-media-player-play-button-md.png"/> : 
          null }
      </div>
    )
  } 
}

module.exports = GlueVideo;
