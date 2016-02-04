// component for individual video
import React from 'react';

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
        className={this.props.style}
        ref={(vidElement) => this.load(vidElement)}
        id={this.props.id}
        src={this.props.src} 
        preload="none" 
        poster="assets/loading.gif"
        controls/>
    )
  }
}

export default VideoCell;