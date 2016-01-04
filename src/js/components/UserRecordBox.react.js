'use strict';
import React from 'react';
import Webcam from 'react-webcam';
import WebcamButton from './Webcam.react';

class UserRecordBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <WebcamButton />
        <Webcam audio={false} />
      </div>
    )
  }
}

export default UserRecordBox;