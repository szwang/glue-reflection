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
          {this.props.src ? 
          <video className={styles.glueVid} id="glueStream">
            <source src={this.props.src} type="video/mp4" />
          </video> :
          null }
        {this.props.showPlayButton && this.props.src ? 
            <img onClick={this.props.clickPlay} className={styles.playImg} src="/assets/playButton.png"/> : 
          null }
      </div>
    )
  } 
}

module.exports = GlueVideo;
