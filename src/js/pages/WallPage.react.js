import React from 'react';
import VideoWall from '../components/VideoWall.react';

class WallPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      source: 'sail-cat'
    }

  }


  componentWillMount() {
  }

  componentDidMount() {
  }



  render() {
    return(
      <div>
        <VideoWall source={this.state.source} videos={this.state.links}/>
      </div>
    )
  }
}

module.exports = WallPage;