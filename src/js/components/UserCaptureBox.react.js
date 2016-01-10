import React from 'react';
import Webcam from './Webcam.react';
import PhotoModal from './PhotoModal.react';
import { Button } from 'react-bootstrap';

class UserCaptureBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      screenshot: null,
      showModal: false 
    };

    this.screenshot = this.screenshot.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  screenshot() {
    this.refs.webcam.getScreenshot()
    .then((imgURL) => {
      this.setState({ screenshot: imgURL });
      this.openModal();
    })
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <Webcam ref='webcam'/>
        <Button onClick={this.screenshot}>Take photo</Button>
        <PhotoModal 
          imgURL={this.state.screenshot} 
          show={this.state.showModal}
          onHide={this.closeModal} />
      </div>
    )
  }
}

export default UserCaptureBox;