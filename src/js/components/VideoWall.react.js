import React from 'react';
import _ from 'lodash';
import Firebase from 'firebase';
import styles from '../../styles/wall.css';

class VideoWall extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      links: []
    };

    this.addLinks = this.addLinks.bind(this);
  }

  componentDidMount() {
    this.compileVideos();
  }

  firebaseRef() {
    return new Firebase('https://reactionwall.firebaseio.com/videos/'+ this.props.source+'/selected');
  }

  compileVideos() {
    console.log('entering compileVideos')
    this.firebaseRef().orderByKey().on('child_added', (snapshot) => {
      console.log(snapshot.val(), snapshot.key());
      this.addLinks(snapshot.val());
    })
    // find all videos from Firebase,
    // render the videos, using a for loop in the render function
    // style videos so they 
  }

  addLinks(link) {
    this.state.links.push(link);
  }

  positionVideos(linkArray) {
    var basic = {
      'height': '200px',
      'width': '200px',
      'position': 'absolute',
      'z-index': '3'
    }

    return _.map(linkArray, (val, key) => {
      var style = basic;
      if(key % 2) { // if odd index
        style = _.merge(style, { 'top': '20%' })
      } else if (key % 3) {
        style = _.merge(style, { 'left' : '30px' })
      } else if (key % 4) {
        style = _.merge(style, { 'right': '180px' })
      }

      return <video src={val} style={style} autoPlay/>;
    })
  }
  

  render() {
    return (
      <div>
      {this.positionVideos(this.state.links)}
      <video className={styles.sourceVideo} src={this.props.source} autoPlay/>
      </div>
    )
  } 
}

export default VideoWall;
