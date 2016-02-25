import React from 'react';
import _ from 'lodash';
import GifCell from './GifCell.react';

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
    var gifs = _.forEach(this.props.gifs, (val, key) => {
      return <GifCell id={val} key={key} />
    });

    return (
      <div>
      {gifs}
      </div>
    )
  }
}

module.exports = GifWall;