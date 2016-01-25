import React from 'react';
import _ from 'lodash';
import Firebase from 'firebase';
import styles from '../../styles/wall.css';
import VideoCell from './VideoCell.react';

var basic = {
  'height': '16%',
  'width': '20%',
  'position': 'relative',
  'zIndex': '1'
}

const baseEl = 'reaction-';

class VideoWall extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      for(var i=14; i>=0; i--) {
        document.getElementById(baseEl+i).play();
      }
    }, 500)
  }

  positionVideos(linkArray) {
    if(linkArray.length > 1) {
      var videos = _.map(linkArray, (val, key) => {
        return <VideoCell id={"reaction-" + key} src={val} style={basic} key={key}/>;
      })
      console.log('vid elements', videos);
      videos.splice(7,0,<video id={"reaction-14"} key={14} src={this.props.link} style={basic} />)
      console.log('vid elements', videos)
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

  // loadOtherVideos() {
  //   for(var i=6; i<15; i++) {
  //     (function(i) {
  //       console.log('i', i)
  //       setTimeout(() => {
  //         let el = document.getElementById('reaction-' + i);
  //         console.log(el)
  //         el.play();
  //         el.pause();
  //       }, 500);
  //     })(i);
  //   }
  // }

  render() {
    var reactionVids = this.positionVideos(this.props.videos);
    // setTimeout(() => this.loadOtherVideos(), 500);

    return (
      <div>
      {reactionVids}
      </div>
    )
  } 
}

export default VideoWall;
