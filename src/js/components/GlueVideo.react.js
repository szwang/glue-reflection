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

  // componentDidMount() {
  //   RecorderStore.addChangeListener(this.hide)
    
  // }

  // componentWillUnmount() {
    
  // }

  clickPlay() {
    RecorderActionCreators.clickPlay();
    setTimeout(() => {
      document.getElementById('glueStream').play();
    }, 2000);
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
            <img onClick={this.clickPlay} className={styles.playImg} src="/assets/playButton.png"/> : 
          null }
      </div>
    )
  } 
}

module.exports = GlueVideo;
