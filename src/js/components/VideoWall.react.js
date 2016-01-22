import React from 'react';

class VideoWall extends React.Component {

  constructor(props) {
    super(props);
  }

  compileVideos() {

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

module.exports = VideoWall;
