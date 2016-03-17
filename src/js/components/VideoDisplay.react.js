import React from 'react';
import styles from '../../styles/wall.css';
import VideoCell from './VideoCell.react';

// this component
class MainVideo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <video className={styles.mainVideo} src={this.props.src}/>
      </div>
    )
  }
}

class ReactionVideoColumns extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if(!!nextProps.videos) {
      console.log('video array updated', this.props.videos)
      // sort videos
    }
  }

  render() {
    console.log('render function', this.props.videos)
    return (
      <div>

      Mapped videos to appear here
      </div>
    )
  }
}


class VideoDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MainVideo />
        <ReactionVideoColumns videos={this.props.videos} />
      </div>
    )
  }
}

export default VideoDisplay;

