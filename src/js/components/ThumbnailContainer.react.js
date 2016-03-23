// component for individual video
import React from 'react';
import styles from '../../styles/wall.css';
import BrowserStore from '../stores/BrowserStore';
import BrowserActionCreators from '../actions/BrowserActionCreators';


// this component holds the reaction gif and original video
class ThumbnailContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }


  render() {
    return(
      <div>
        <SourceVideoGif />
        <GifCell />
      </div>
    )
  }
}

export default ThumbnailContainer;