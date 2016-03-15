import React from 'react';
import styles from '../../styles/wall.css';

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

  render() {
    return (
      <div>
        {mappedVideosLeft}
        {mappedVideosRight}
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