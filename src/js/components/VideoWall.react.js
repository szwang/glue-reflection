import React from 'react';
import _ from 'lodash';
import Firebase from 'firebase';
import styles from '../../styles/wall.css';
import VideoCell from './VideoCell.react';

// TODO: refactor to "WallRow" and "WallCol" when you figure out this shit
class WallTop extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }
}

class WallLeft extends React.Component {

}

class WallRight extends React.Component {

}

class WallBottom extends React.Component {
  
}

var reactionVideo = {
  height: '20%',
  width: '20%',
  position: 'relative',
  zIndex: '1'
};

var mainVideo = {
  height: '20%',
  width: '24%',
  position: 'relative',
  zIndex: '2'
};

const baseEl = 'reaction-';

class VideoWall extends React.Component {

  constructor(props) {
    super(props);

    // this.onCanPlayThrough = this.onCanPlayThrough.bind(this);
  }

  componentDidMount() {
  }

  // onCanPlayThrough() {
  //   console.log(this.state.numLoaded)
  // }

  positionVideos(linkArray) {
    if(linkArray.length > 1) {
      var videos = _.map(linkArray, (val, key) => {
        return <VideoCell 
                  id={"reaction-" + key} 
                  src={val} 
                  style={reactionVideo} 
                  key={key} />;
      })
      var blank = (<VideoCell style={reactionVideo} />);
      console.log(videos)
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
      <video src="" />
      </div>
    )
  } 
}

export default VideoWall;
