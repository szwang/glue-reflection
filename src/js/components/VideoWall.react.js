import React from 'react';
import _ from 'lodash';
import Firebase from 'firebase';
import styles from '../../styles/wall.css';

class VideoWall extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.loadVideos();
  }

  positionVideos(linkArray) {
    var basic = {
      'height': '16%',
      'width': '20%',
      'position': 'relative',
      'zIndex': '1'
    }

    return _.map(linkArray, (val, key) => {
      var style = basic; 

      return <video controls id={"reaction-" + key} src={val} style={style} key={key} preload="none" poster="assets/playButton.png"/>;
    })
  }

  loadVideos() {
    // two options: store all video info in store
    // or simply have all logic in
    // var vidArray = positionVideos(this.props.videos);
    // _.forEach(vidArray, (value, key) => {
    //   // grab each element and start loading it
    // })
    return new Promise((resolve, reject) => {
      for(var i=0; i<8; i++) {
        console.log(document.getElementById('reaction-' + i));
        document.getElementById('reaction-'+i).load();
        console.log('loading video ' + i);
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
    setTimeout(() => {
      this.loadVideos().then(() => this.playVideos());
    }, 5000)
    return (
      <div>
      {reactionVids}
      <video id="sourceVid" controls className={styles.sourceVideo} src="https://s3.amazonaws.com/recordrtc-test/sample-vids/Cat+Jump+Fail+with+Music-+Sail+by+AWOLNATION.mp4"/>
      </div>
    )
  } 
}

export default VideoWall;
