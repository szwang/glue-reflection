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
    this.mouseOver = this.mouseOver.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  mouseOver() {
    this.setState({ mouseOver: true })
  }

  mouseLeave() {
    
  }


  render() { //TODO create link!
    return(
      <div className={styles.thumbnail} onMouseOver={this.mouseOver()}>
        <Link to={`/wall/${this.props.video.name}`} >    
          <div className={styles.vidCellWrapper}>
            <SourceVideoCell className={styles.sourceVidCell} screenshot={this.props.video.screenshot} />
          </div>
          <GifCell className={styles.gifCell} gif={this.props.gif} />
        </Link>
        { this.state.mouseOver ? 
          <div className={styles.thumbnailOverlay}>
            <span className={styles.thumbnailText}>{this.props.video.name}</span>
          </div> : null }
      </div>
    )
  }
}

export default BrowserThumbnail;