import React from 'react';
import _ from 'lodash';
import GifCell from './GifCell.react';
import styles from '../../styles/browser.css';

class GifWall extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentDidMount() {

  }

  componentwillUnmount() {
  }

  render() {
    var gifs = _.map(this.props.gifs, (val, key) => {
      return <GifCell style={styles.gifCell} id={val.id} video={val.video} key={key} />
    });

    return (
      <div className={styles.gifWall}>
      {gifs}
      </div>
    )
  }
}

module.exports = GifWall;