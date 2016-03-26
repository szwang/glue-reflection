// component for individual video
import React from 'react';
import styles from '../../styles/wall.css';
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
      <Link to={`/wall/${this.props.video}`} >
        <div>
          <SourceVideoCell video={this.props.video} />
          <GifCell gif={this.props.gif} />
        </div>
      </Link>
    )
  }
}

export default BrowserThumbnail;