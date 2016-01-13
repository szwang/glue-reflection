import React from 'react';
import Webcam from './Webcam.react';
import PhotoModal from './PhotoModal.react';
import ResponseModal from './ResponseModal.react';
import ImageStore from '../stores/ImageStore';
import { Button } from 'react-bootstrap';
import styles from '../../styles/global.css';

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
      <div>
        <Webcam ref='webcam' className={styles.webcam}/>
      </div>
      <div>
        <Button onClick={this.screenshot}>Take Photo</Button>
      </div>
      </div>
    )
  }
}

export default UserCaptureBox;
