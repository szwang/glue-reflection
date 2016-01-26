import React from 'react';
import styles from '../../styles/recorder.css';

var style = { height: '100%', margin: '0 auto', display: 'block' };

class GlueVideo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showSource: false }
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
    if(nextProps.src) {
      console.log('nextProps', nextProps.src);
      this.setState({ showSource: true })
    }
  }

  render() {

    return (
      <div className={styles.vidContainer}>
        <video className={styles.glueVid} id="glueStream">
          {this.props.showSource ? <source src={this.props.src} type="video/mp4" /> : <source /> }
        </video>
        {this.props.showPlayButton ? 
            <img onClick={this.props.clickPlay} className={styles.playImg} src="/assets/playButton.png"/> : 
          null }
      </div>
    )
  } 
}

module.exports = GlueVideo;
