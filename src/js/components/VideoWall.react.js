import React from 'react';
import _ from 'lodash';
import Firebase from 'firebase';
import styles from '../../styles/wall.css';


class VideoWall extends React.Component {

  constructor(props) {
    super(props);
  }

  positionVideos(linkArray) {
    var basic = {
      'height': '200px',
      'width': '200px',
      'position': 'relative',
      'zIndex': '3'
    }

    return _.map(linkArray, (val, key) => {
      console.log('link Array', linkArray);
      var style = basic;
      // if(key % 2 == 0) { // if odd index
      //   style = _.merge(style, { 'top': '20%' })
      // } else {
      //   style = _.merge(style, { 'left' : '20%' })
      // }

      return <video src={val} style={style} key={key} autoPlay/>;
    })
  }
  

  render() {
    var reactionVids = this.positionVideos(this.props.videos);
    return (
      <div>
      {reactionVids}
      <video className={styles.sourceVideo} src="https://s3.amazonaws.com/recordrtc-test/sample-vids/Cat+Jump+Fail+with+Music-+Sail+by+AWOLNATION.mp4" autoPlay/>
      </div>
    )
  } 
}

export default VideoWall;
