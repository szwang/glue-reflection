
import React from 'react';

class VidWatchBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <video controls>
          <source src="http://www.html5rocks.com/en/tutorials/video/basics/devstories.webm"/>
        </video> 
      </div>
    )
  }
}

export default VidWatchBox;
