import React from 'react';
import VideoWall from '../components/VideoWall.react';
import WallStore from '../stores/WallStore';
import WallActionCreators from '../actions/WallActionCreators';

var containerStyle = {
  marginTop: '50px'
}

class WallPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      source: 'sail-cat',
      videos: []
    }

    this.getVideos = this.getVideos.bind(this);
  }

  componentDidMount() {
    WallStore.addChangeListener(this.getVideos);
    WallActionCreators.getVideos(this.state.source);
  }

  componentWillUnmount() {
    WallStore.removeChangeListener(this.getVideos);
  }

  getVideos() {
    this.setState({ videos: WallStore.getWallVideos() });
  }

  render() {
    return(
      <div style={containerStyle}>
        <VideoWall 
        source={this.state.source} 
        link="https://s3.amazonaws.com/recordrtc-test/sample-vids/Cat+Jump+Fail+with+Music+Sail+by+AWOLNATION.mp4" 
        videos={this.state.videos}/>
      </div>
    )
  }
}

module.exports = WallPage;