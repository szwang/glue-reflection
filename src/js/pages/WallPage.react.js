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
      videos: null,
      allVidsDone: false,
      showGifs: false
    }
    this.getVideos = this.getVideos.bind(this);
    this.playAllVids = this.playAllVids.bind(this);
    this.allowVote = this.allowVote.bind(this);
  }

  componentDidMount() {
    WallStore.addChangeListener(this.getVideos);
    WallActionCreators.getVideos(this.state.source);
    WallStore.addPlayListener(this.playAllVids);
    WallStore.addVoteListener(this.allowVote); //for when video ends, when user can upvote reactions
  }

  componentWillUnmount() {
    WallStore.removeChangeListener(this.getVideos);
    WallStore.removePlayListener(this.playAllVids);
    WallStore.removeVoteListener(this.allowVote);

  }

  getVideos() {
    this.setState({ 
      sourceLink: WallStore.getSourceVideo(),
      videos: WallStore.getReactionVideos()
    });
  }

  playAllVids() {
    //get all video elements and play them
    var videos = document.getElementsByTagName('video');
    _.each(videos, (val) => {
      val.play();
    })
  }

  allowVote() {
    console.log('can vote now')
    this.setState({ allVidsDone: true });
    setTimeout(() => {
      this.setState({ showGifs: true })
    }, 5000)
  }

  render() {   
    return(
      <div className={styles.wallWrapper}>   
      {this.state.allVidsDone ? 
        <div className={styles.finishedAlert}>
          Choose the reactions you liked!
        </div>
        : null} 
       <VideoDisplay
        videos={this.state.videos}
        src={this.state.sourceLink}
        sourceVid={this.state.source}
        allVidsDone={this.state.allVidsDone}
        showGifs={this.state.showGifs} />
      </div>
    )
  }
}


module.exports = WallPage;

