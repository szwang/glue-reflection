'use strict';
import React from 'react';
import Webcam from 'react-webcam';

class UserCamBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <camera id='glueCam' data-app-id='a-79ce6c40-94b3-0133-e77d-22000bb743dd'></camera>
      </div>
    )
  }
}

export default UserCamBox;