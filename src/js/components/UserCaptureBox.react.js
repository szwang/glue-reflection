import React from 'react';
import Webcam from './Webcam.react';
import PhotoModal from './PhotoModal.react';
import ResponseModal from './ResponseModal.react';
import ImageStore from '../stores/ImageStore';
import { Button } from 'react-bootstrap';

class UserCaptureBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      screenshot: null,
      showPhotoModal: false,
      showResponseModal: false 
    };

    this.screenshot = this.screenshot.bind(this);
    this.openPhotoModal = this.openPhotoModal.bind(this);
    this.closePhotoModal = this.closePhotoModal.bind(this);
    this.openResponseModal = this.openResponseModal.bind(this);
    this.closeResponseModal = this.closeResponseModal.bind(this);
  }

  componentDidMount() {
    ImageStore.addChangeListener(this.openResponseModal);
  }

  componentWillUnmount() {
    ImageStore.removeChangeListener(this.openResponseModal);
  }

  openResponseModal() {
    this.closePhotoModal();
    this.setState({ showResponseModal: true });
    setTimeout(() => {
      this.closeResponseModal();
    }, 3000);
  }

  closeResponseModal() {
    this.setState({ showResponseModal: false });
  }

  screenshot() {
    this.refs.webcam.getScreenshot()
    .then((imgURL) => {
      this.setState({ screenshot: imgURL });
      this.openPhotoModal();
    })
  }

  openPhotoModal() {
    this.setState({ showPhotoModal: true });
  }

  closePhotoModal() {
    this.setState({ showPhotoModal: false });
  }

  render() {
    return (
      <div>
        <Webcam ref='webcam'/>
        <Button onClick={this.screenshot}>Take photo</Button>
        <PhotoModal 
          imgURL={this.state.screenshot} 
          show={this.state.showPhotoModal}
          onHide={this.closePhotoModal} />
        <ResponseModal
          show={this.state.showResponseModal}
          onHide={this.closeResponseModal} />
      </div>
    )
  }
}

export default UserCaptureBox;
