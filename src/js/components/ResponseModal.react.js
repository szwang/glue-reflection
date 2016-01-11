import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ImageStore from '../stores/ImageStore';
import styles from '../../styles/global.css';

class ResponseModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let status = ImageStore.getUploadStatus();
    let id = ImageStore.getTaskID();
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Body>
          <div>
            { status ? "Thank you! Your image has been successfully uploaded." :
            "Image upload was not successful" }
          </div>
          <div className={styles.taskID}>
            { id ? id.toString() : null }
          </div>
          <div>
            { id ? "Copy the id above and return to the Mechanical Turk Task Page to complete the task." : null }
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default ResponseModal;