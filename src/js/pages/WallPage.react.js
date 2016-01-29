import React from 'react';
import { WallRow, WallCol, WallCenter } from '../components/VideoWall.react';
import WallStore from '../stores/WallStore';
import WallActionCreators from '../actions/WallActionCreators';
import styles from '../../styles/wall.css';


var containerStyle = {
  marginTop: '50px'
}

class WallPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      source: this.props.params.source,
      sourceLink: null,
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
    this.setState({ 
      videos: WallStore.getWallVideos(),
      sourceLink: WallStore.getSourceVideo()
    });
  }

  render() {
    return(
      <div className={styles.wallWrapper}>    
      test
      </div>
    )
  }
}

module.exports = WallPage;

        // <WallRow className={styles.wallTop} />
        // <WallCenter 
        //   className={styles.wallCenter}
        //   source={this.state.sourceLink} />
        // <WallCol className={styles.wallLeft} />
        // <WallCol className={styles.wallRight} />
        // <WallRow className={styles.wallBottom} />