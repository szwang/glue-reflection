// component for  individual video
import React from 'react';
import styles from '../../styles/wall.css';
import WallStore from '../stores/WallStore';
import WallActionCreators from '../actions/WallActionCreators';

class VideoCell extends React.Component {

  constructor(props) {
    super(props);

    this.signalCanPlay = this.signalCanPlay.bind(this);
    this.signalVidEnd = this.signalVidEnd.bind(this);
    this.vote = this.vote.bind(this);
  }

  componentDidMount() {
    document.getElementById(this.props.id).addEventListener('canplay', this.signalCanPlay);
    document.getElementById(this.props.id).addEventListener('ended', this.signalVidEnd);
  }

  componentWillUnmount() {
    document.getElementById(this.props.id).removeEventListener('canplay', this.signalCanPlay);
    document.getElementById(this.props.id).removeEventListener('ended', this.signalVidEnd);
  }

  signalCanPlay() {
    //update store, which has a reducer function
    //which triggers a play event once all videos can be played
    WallActionCreators.canPlayVideo();
  }

  signalVidEnd() {
    WallActionCreators.canVote();
  }

  vote() {
    //change border color
    //post to database
    WallActionCreators.vote(this.props.id, this.props.sourceVid);
  }

  render() {
    return(
      <video
        className={this.props.className}
        id={this.props.id}
        src={this.props.src} 
        poster="assets/loading.gif"
        onClick={this.vote}/>
    )
  }
}

export default VideoCell;