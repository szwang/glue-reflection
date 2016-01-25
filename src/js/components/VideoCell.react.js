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

  load(vidElement) {
    if(JSON.parse(vidElement.id.substring(9)) < 6) {
      vidElement.load();
    }
  }

  render() {
    return(
      <video
        controls 
        ref={(vidElement) => this.load(vidElement)}
        id={this.props.id}
        style={this.props.style}
        src={this.props.src} 
        preload="none" 
        poster="assets/playButton.png"/>
    )
  }
}

export default VideoCell;