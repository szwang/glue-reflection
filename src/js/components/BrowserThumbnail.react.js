// component for individual video
import React from 'react';
import styles from '../../styles/browser.css';
import BrowserStore from '../stores/BrowserStore';
import BrowserActionCreators from '../actions/BrowserActionCreators';
import GifCell from './GifCell.react';
import SourceVideoCell from './SourceVideoCell.react';
import { Link } from 'react-router';

// this component holds the reaction gif and original video
class BrowserThumbnail extends React.Component {

  constructor(props) {
    super(props);
    // receives props from BTContainer, gif(id) and video
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }


  render() { //TODO create link!
    return(
      <div className={styles.thumbnail}>
        <Link to={`/wall/${this.props.video.name}`} >    
          <div className={styles.vidCellWrapper}>
            <SourceVideoCell className={styles.sourceVidCell} screenshot={this.props.video.screenshot} />
          </div>
          <GifCell className={styles.gifCell} gif={this.props.gif} />
        </Link>
          <div className={styles.thumbnailOverlay}>
            <span className={styles.thumbnailText}>{this.props.video.name}</span>
          </div>
      </div>
    )
  }
}

export default BrowserThumbnail;