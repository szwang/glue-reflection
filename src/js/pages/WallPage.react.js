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
  }

  playAllVids() {
    //get all video elements and play them
    var videos = document.getElementsByTagName('video');
    console.log('videos', videos)
    _.each(videos, (val) => {
      val.play();
    })
  }

  render() {
    return(
      <div>    
       <VideoDisplay
        videos={this.state.videos}
        src={this.state.sourceLink} />
      </div>
    )
  }
}


// table components:
/**
<table border="1">
<tr>
  <td>0,0</td>  
  <td>0,1</td>
  <td>0,2</td>
  <td>0,3</td>
</tr>
<tr>
  <td>1,0</td>
  <td colspan=2 rowspan=2>1,1</td>
  <td>1,3</td>
</tr>
<tr>
  <td>2,0</td>
  <td>2,3</td>
</tr>
<tr>
  <td>3,0</td>
  <td>3,1</td>
  <td>3,2</td>
  <td>3,3</td>
</tr>
</table>
**/

module.exports = WallPage;

