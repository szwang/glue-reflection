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

class VideoWall extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.loadVideos();
  }

  positionVideos(linkArray) {
    return _.map(linkArray, (val, key) => {
      return <VideoCell id={"reaction-" + key} src={val} style={basic} key={key}/>;
    })
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

  loadOtherVideos() {
    // var current = 6;
    // var incrementalPlay = setInterval(() => {
    //   console.log('current element: ', current)
    //   if(current > 7) stopPlay();
      
      // let el = document.getElementById('reaction-' + current);
      // el.play();
      // el.pause();
    //   current++;
    // }, 500);


    // function stopPlay() {
    //   clearInterval(incrementalPlay);
    // }

    for(var i=6; i<15; i++) {
      (function(i) {
        console.log('i', i)
        setTimeout(() => {
          let el = document.getElementById('reaction-' + i);
          console.log(el)
          el.play();
          el.pause();
        }, 500);
      })(i);
      // setTimeout((i) => {
      //   let el = document.getElementById('reaction-' + i);
      //   el.play();
      //   el.pause();
      // }, 200);
    }
  }

  //once all videos are rendered, begin loading all (in batches?)
  //tell user things are loading
  //once all videos complete loading, play all at exactly the same time
  

  render() {
    var reactionVids = this.positionVideos(this.props.videos);
    setTimeout(() => this.loadOtherVideos(), 500);
    // setTimeout(() => {
    //   this.playPause();
    // }, 500)
      // <video id="sourceVid" controls className={styles.sourceVideo} src="https://s3.amazonaws.com/recordrtc-test/sample-vids/Cat+Jump+Fail+with+Music-+Sail+by+AWOLNATION.mp4"/>

    return (
      <div>
      {reactionVids}
      </div>
    )
  } 
}

export default VideoWall;
