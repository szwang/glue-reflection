import React from 'react';
import styles from '../../styles/recorder.css';

var style = { height: '100%', margin: '0 auto', display: 'block' };

class GlueVideo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.vidContainer}>
        <video className={styles.glueVid} id="glueStream">
          <source src="https://s3.amazonaws.com/recordrtc-test/sample-vids/Cat+Jump+Fail+with+Music-+Sail+by+AWOLNATION.mp4"
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
