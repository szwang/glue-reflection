import React from 'react';
import _ from 'lodash';
import GifCell from './GifCell.react';
import styles from '../../styles/browser.css'

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
      return <GifCell style={styles.gifCell} id={val} key={key} />
    });

    return (
      <div>
      {gifs}
      </div>
    )
  }
}

module.exports = GifWall;