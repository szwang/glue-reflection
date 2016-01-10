import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class PhotoModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        Thanks!
        <img src={this.props.imgURL} />
        <Button>Submit</Button>
      </Modal>
    )
  }
}

export default PhotoModal;