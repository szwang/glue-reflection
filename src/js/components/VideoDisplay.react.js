import React from 'react';
import styles from '../../styles/wall.css';
import VideoCell from './VideoCell.react';
import _ from 'lodash';

// this component
class MainVideo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <VideoCell className={styles.mainVideo} src={this.props.src}/>
      </div>
    )
  }
}

class ReactionVideoColumns extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {   
    if(this.props.videos) {
      //sample 5 videos
      //sort them into 2 separate columns

      var left = _.take(this.props.videos, 3);
      var right = _.takeRight(this.props.videos, 2);

      var leftCol = _.map(left, (val, key) => {
        return <VideoCell src={val} key={key} />
      })

      var rightCol = _.map(right, (val, key) => {
        return <VideoCell src={val} key={key} />
      })
    }


    return (
      <div>
      {leftCol}
      {rightCol}
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
        <MainVideo src={this.props.src}/>
        <ReactionVideoColumns videos={this.props.videos} />
      </div>
    )
  }
}

export default VideoDisplay;

      