// component for individual video
import React from 'react';
import styles from '../../styles/browser.css';
import BrowserStore from '../stores/BrowserStore';
import BrowserActionCreators from '../actions/BrowserActionCreators';
import GifCell from './GifCell.react';
import SourceVideoCell from './SourceVideoCell.react';
import { Link } from 'react-router';
import names from '../../../names.json';

// this component holds the reaction gif and original video
class BrowserThumbnail extends React.Component {

  constructor(props) {
    super(props);

    this.state = { mouseOver: false };
    // receives props from BTContainer, gif(id) and video
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  mouseOver() {
    console.log('mouseOver triggered')
    this.setState({ mouseOver: true });
  }

  mouseLeave() {
    this.setState({ mouseOver: false });
  }


  render() { 
    return(
      <div className={styles.thumbnailContainer} >
        <div className={styles.thumbnail} onMouseOver={this.mouseOver} onMouseLeave={this.mouseLeave}>
          
          <div className={styles.thumbnailContent}>
            <Link to={`/wall/${this.props.video.name}`} >    
            <div className={styles.vidCellWrapper}>
              <SourceVideoCell className={styles.sourceVidCell} screenshot={this.props.video.screenshot} />
            </div>
              <GifCell className={styles.gifCell} gif={this.props.gif} />
            </Link>
          </div>

          { this.mouseOver ? <div className={styles.thumbnailOverlay}>
            <span className={styles.thumbnailText}>{names[this.props.video.name]}</span>
          </div> : null }

        </div>
      </div>
    )
  }
}

export default BrowserThumbnail;

