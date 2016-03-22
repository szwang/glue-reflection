// component for individual video
import React from 'react';
import styles from '../../styles/wall.css'

class VideoCell extends React.Component {

  constructor(props) {
    super(props);

    this.signalCanPlay = this.signalCanPlay.bind(this);
  }

  componentDidMount() {
    window.addEventListener('oncanplaythrough', this.signalCanPlay);
  }

  componentWillUnmount() {
    window.removeEventListener('oncanplaythrough', this.signalCanPlay);
  }

  signalCanPlay() {
    console.log('signalCanPlay')
  }

  render() {
    return(
      <video
        style={this.props.style}
        className={styles.vidCell}
        id={this.props.id}
        src={this.props.src} 
        preload="none" 
        poster="assets/loading.gif"/>
    )
  }
}

export default VideoCell;