// component for individual video
import React from 'react';
import styles from '../../styles/browser.css';
import BrowserStore from '../stores/BrowserStore';
import BrowserActionCreators from '../actions/BrowserActionCreators';
import GifCell from './GifCell.react';
import SourceVideoCell from './SourceVideoCell.react';
import { Link } from 'react-router';
// import names from 'json!../../../names.json';

var names = {
  "sail-cat": "Cat Jump Fail with Music: Sail by AWOLNATION",
  "larvae": "Man vs. Wild - Eating Giant Larvae",
  "barking-cat": "Barking cat gets caught!",
  "daddy-long-legs": "Nest of Spiders",
  "hey-ron": "Hey, Ron. Hey, Billy",
  "highway-car": "What happens when you take your eyes off the road",
  "homecoming": "Surprise Military Family Welcome Home",
  "jetpack-fail": "Fox 5 JetPack FAIL",
  "nutcracker": "FailArmy Presents Nutcracker Fails",
  "put-put": "Greatest putt-putt shot of all time",
  "snake": "if this dosn't make you jump nothing will",
  "surprised-kitty": "Surprised Kitty (Original)"
}

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
        <Link to={`/wall/${this.props.video.name}`} >    
        <div className={styles.thumbnail} onMouseOver={this.mouseOver} onMouseLeave={this.mouseLeave}>
          
          <div className={styles.thumbnailContent}>
            <div className={styles.vidCellWrapper}>
              <SourceVideoCell className={styles.sourceVidCell} screenshot={this.props.video.screenshot} />
            </div>
              <GifCell className={styles.gifCell} gif={this.props.gif} />
          </div>

          { this.state.mouseOver ? <div className={styles.thumbnailOverlay}>
            <div className={styles.thumbnailText}>{names[this.props.video.name]}</div>
          </div> : null }

        </div>
          </Link>
      </div>
    )
  }
}

export default BrowserThumbnail;

