// component for individual video
import React from 'react';

class VideoCell extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  getVideos() {
  }

  render() {
    return(
      <video controls 
        id={"reaction-" + this.props.id}
        style={this.props.style}
        src={this.props.src} 
        preload="none" 
        poster="assets/playButton.png"/>
    )
  }
}

export default VideoCell;