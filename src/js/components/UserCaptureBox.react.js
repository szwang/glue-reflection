import React from 'react';
import Webcam from './Webcam.react';

class UserCaptureBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { screenshot: null };

    this.screenshot = this.screenshot.bind(this);
  }

  screenshot() {
    this.refs.webcam.getScreenshot()
    .then((imgURL) => {
      this.setState({ screenshot: imgURL });
    })
  }

  render() {
    return (
      <div>
        <Webcam ref='webcam'/>
        <button onClick={this.screenshot}>Take photo</button>
      </div>
    )
  }
}

export default UserCaptureBox;