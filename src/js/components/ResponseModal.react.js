import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import RecorderStore from '../stores/ImageStore';
import styles from '../../styles/global.css';

class ResponseModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.hide}>
        <Modal.Body>
        {this.props.success ? <div>Success</div> : <div> Failure</div>}
        </Modal.Body>
      </Modal>
    )
  }
}

export default ResponseModal;