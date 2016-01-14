import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import RecorderStore from '../stores/ImageStore';
import styles from '../../styles/recorder.css';

class ResponseModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var id = this.props.taskID;

    return (
      <Modal show={this.props.show} onHide={this.props.hide}>
        <Modal.Body>
        <div className={styles.submitMessage}>
        {this.props.success ? "Thank you! Your image has been successfully uploaded." :
            "Video upload was not successful. Return to the MTurk page to complete the HIT." }
        </div>
          <div>
            <div className={styles.taskID}> { id ? id.toString() : null } </div>
            <div className={styles.submitMessage}>
              { id ? "Copy the ID above and return to the Mechanical Turk Page to complete the task." : null }
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default ResponseModal;