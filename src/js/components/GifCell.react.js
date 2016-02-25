// component for individual video
import React from 'react';

class GifCell extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        {this.props.id}
      </div>
    )
  }
}

export default GifCell;