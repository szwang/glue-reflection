import React from 'react';
import VideoWall from '../components/VideoWall.react';
import WallStore from '../stores/WallStore';
import WallActionCreators from '../actions/WallActionCreators';

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
    console.log('in getVideos, ', WallStore.getWallVideos())
  }

  render() {
    return(
      <div>
        <VideoWall source={this.state.source} videos={this.state.videos}/>
      </div>
    )
  }
}

module.exports = WallPage;