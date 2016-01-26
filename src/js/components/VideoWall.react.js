import React from 'react';
import _ from 'lodash';
import Firebase from 'firebase';
import styles from '../../styles/wall.css';
import VideoCell from './VideoCell.react';

var reactionVideo = {
  'height': '16%',
  'width': '20%',
  'position': 'relative',
  'zIndex': '1'
};

var mainVideo = _.merge(reactionVideo, {
  'borderColor': 'white',
  'borderWidth': '10px'
});

mainVideo.zIndex = '2';

const baseEl = 'reaction-';

class VideoWall extends React.Component {

  constructor(props) {
    super(props);

    this.onCanPlayThrough = this.onCanPlayThrough.bind(this);
  }

  componentDidMount() {
  }

  onCanPlayThrough() {
    console.log(this.state.numLoaded)
  }

  positionVideos(linkArray) {
    if(linkArray.length > 1) {
      var videos = _.map(linkArray, (val, key) => {
        return <VideoCell 
                  id={"reaction-" + key} 
                  src={val} 
                  style={reactionVideo} 
                  key={key}
                  onCanPlayThrough={this.onCanPlayThrough()}/>;
      })
      videos.splice(7,0,<VideoCell 
                          id={"reaction-14"} 
                          key={14} 
                          src={this.props.link} 
                          style={mainVideo}
                          onCanPlayThrough={this.onCanPlayThrough()}/>)
      return videos;
    }
  }

  loadVideos(start=0, end=6) {
    return new Promise((resolve, reject) => {
      for(var i=start; i<end; i++) {
        document.getElementById('reaction-'+i).load();
      }
      resolve();
    })
  }

  playVideos() {
    console.log('going to play videos')
    for(var i=0; i<8; i++) {
      document.getElementById('reaction-'+i).play();
    }
  }

  playPause() {
    for(var i=6; i<8; i++) {
      el.play();
      el.pause();
    }
  }

  render() {
    var reactionVids = this.positionVideos(this.props.videos);
    // setTimeout(() => this.loadOtherVideos(), 500);

    setTimeout(() => {
      for(var i=14; i>=0; i--) {
        document.getElementById(baseEl+i).play();
      }
    }, 4000)

    return (
      <div>
      {reactionVids}
      </div>
    )
  } 
}

export default VideoWall;
