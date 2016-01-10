import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class PhotoModal extends React.Component {
  constructor(props) {
    super(props);
  }

  submitPhoto() {

  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header> Thank you! Take a look at your picture </Modal.Header>
        <Modal.Body>
        <img src={this.props.imgURL} />
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={this.submitPhoto}>Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default PhotoModal;