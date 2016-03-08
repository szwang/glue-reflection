// component for individual video
import React from 'react';
import styles from '../../styles/wall.css'

class VideoCell extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('oncanplaythrough', this.props.onCanPlayThrough);
  }

  componentWillUnmount() {
    window.removeEventListener('oncanplaythrough', this.props.onCanPlayThrough);
  }

  load(vidElement) {
    // if(JSON.parse(vidElement.id.substring(9)) < 6) {
      vidElement.load();
    // }
  }

  render() {
    return(
      <video
        style={this.props.style}
        className={styles.vidCell}
        ref={(vidElement) => this.load(vidElement)}
        id={this.props.id}
        src={this.props.src} 
        preload="none" 
        poster="assets/loading.gif"/>
    )
  }
}

export default VideoCell;