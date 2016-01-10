import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ImageStore from '../stores/ImageStore';

class ResponseModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let status = ImageStore.getUploadStatus();
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Body>
          {status ? "Thank you! Your image has been successfully uploaded." :
          "Image upload was not successful" }
        </Modal.Body>
      </Modal>
    )
  }
}

export default ResponseModal;