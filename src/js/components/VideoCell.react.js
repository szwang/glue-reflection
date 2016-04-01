// component for individual video
import React from 'react';
import styles from '../../styles/wall.css';
import WallStore from '../stores/WallStore';
import WallActionCreators from '../actions/WallActionCreators';

class VideoCell extends React.Component {

  constructor(props) {
    super(props);

    this.signalCanPlay = this.signalCanPlay.bind(this);
  }

  componentDidMount() {
    document.getElementById(this.props.id).addEventListener('canplay', this.signalCanPlay);
  }

  componentWillUnmount() {
    document.getElementById(this.props.id).removeEventListener('canplay', this.signalCanPlay);
  }

  signalCanPlay() {
    //update store, which has a reducer function
    //which triggers a play event once all videos can be played
    WallActionCreators.canPlayVideo();
  }

  render() {
    return(
      <video
        className={this.props.className}
        id={this.props.id}
        src={this.props.src} 
        poster="assets/loading.gif"
        controls/>
    )
  }
}

export default VideoCell;