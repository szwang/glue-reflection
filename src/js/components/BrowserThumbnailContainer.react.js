import React from 'react';
import _ from 'lodash';
import GifCell from './GifCell.react';
import styles from '../../styles/browser.css';
import BrowserThumbnail from './BrowserThumbnail.react';

class BrowserThumbnailContainer extends React.Component {
  constructor(props) {
    super(props);
    // receives gifs from BrowserPage
    console.log('BrowserThumbnailContainer', this.props.gifs)
    // TODO: pass info to thumbnail container
  }

  componentWillMount() {
  }

  componentDidMount() {

  }

  componentwillUnmount() {
  }

  render() {
    var thumbnails = _.map(this.props.gifs, (val, key) => {
      console.log('inside map func', val)
      return <BrowserThumbnail key={key} gif={val.id} video={val.video} />
    })

    return (
      <div className={styles.thumbnailContainer}>
        {thumbnails}
      </div>
    )
  }
}

export default BrowserThumbnailContainer;