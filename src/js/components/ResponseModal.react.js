import React from 'react';
import { Modal } from 'react-bootstrap';
import RecorderStore from '../stores/ImageStore';
import styles from '../../styles/recorder.css';

class ResponseModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let id = this.props.taskID;

    return (
      <Modal show={this.props.show}>
        <Modal.Body>
        <div className={styles.submitMessage}>
        {this.props.success ? "Thank you! Your video has been successfully uploaded." :
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