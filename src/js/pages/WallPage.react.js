import React from 'react';
import { WallRow, WallCol, WallCenter } from '../components/VideoWall.react';
import WallStore from '../stores/WallStore';
import WallActionCreators from '../actions/WallActionCreators';
import styles from '../../styles/wall.css';
import VideoDisplay from '../components/VideoDisplay.react';
import _ from 'lodash';


var containerStyle = {
  marginTop: '50px'
}

class WallPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      source: this.props.params.source,
      cellHeight: window.innerHeight / 4,
      sourceLink: null,
      videos: null
    }
    this.getVideos = this.getVideos.bind(this);
    this.playAllVids = this.playAllVids.bind(this);
  }

  componentDidMount() {
    WallStore.addChangeListener(this.getVideos);
    WallActionCreators.getVideos(this.state.source);
    WallStore.addPlayListener(this.playAllVids);
  }

  componentWillUnmount() {
    WallStore.removeChangeListener(this.getVideos);
    WallStore.removePlayListener(this.playAllVids);
  }

  getVideos() {
    this.setState({ 
      sourceLink: WallStore.getSourceVideo(),
      videos: WallStore.getReactionVideos()
    });
    console.log(this.state, 'in wallpage')
  }

  playAllVids() {
    //get all video elements and play them
    var videos = document.getElementsByTagName('video');
    _.each(videos, (val) => {
      val.play();
    })
  }

  render() {   
    return(
      <div className={styles.wallWrapper}>    
       <VideoDisplay
        videos={this.state.videos}
        src={this.state.sourceLink}
        sourceVid={this.state.source} />
      </div>
    )
  }
}


module.exports = WallPage;

