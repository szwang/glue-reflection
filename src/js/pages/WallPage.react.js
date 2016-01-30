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
      xByX: 4,
      sourceLink: null,
      videos: [],
      top: [],
      left: [],
      right: [],
      bottom: []
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
      sourceLink: WallStore.getSourceVideo(),
      top: WallStore.getDiv('top'),
      bottom: WallStore.getDiv('bottom'),
      left: WallStore.getDiv('left'),
      right: WallStore.getDiv('right'),
      videos: WallStore.getReactionVideos()
    });
    console.log('fingers crossed', this.state)
  }

  render() {
    return(
      <div className={styles.wallWrapper}>    
        <WallRow 
          vids={this.state.top}
          className={styles.wallTop} />
        <WallCenter 
          className={styles.wallCenter}
          source={this.state.sourceLink} />
        <WallCol 
          vids={this.state.left}
          className={styles.wallLeft} />
        <WallCol 
          vids={this.state.right}
          className={styles.wallRight} />
        <WallRow 
          vids={this.state.bottom}
          className={styles.wallBottom} />
      </div>
    )
  }
}

module.exports = WallPage;