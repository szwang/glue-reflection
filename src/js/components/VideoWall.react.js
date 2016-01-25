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
        console.log('loading video ' + document.getElementById('reaction-'+i));
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

  //once all videos are rendered, begin loading all (in batches?)
  //tell user things are loading
  //once all videos complete loading, play all at exactly the same time
  

  render() {
    var reactionVids = this.positionVideos(this.props.videos);
    // setTimeout(() => {
    //   console.log('array of videos', reactionVids)
    //   this.loadVideos()
    //   .then(() => {
    //     return this.loadVideos(6,8)
    //   })
    //   .then(() => {
    //     console.log('videos loaded')
    //   })
      
    // }, 5000)

    return (
      <div>
      {this.positionVideos(this.props.videos)}
      <video id="sourceVid" controls className={styles.sourceVideo} src="https://s3.amazonaws.com/recordrtc-test/sample-vids/Cat+Jump+Fail+with+Music-+Sail+by+AWOLNATION.mp4"/>
      </div>
    )
  } 
}

export default VideoWall;
