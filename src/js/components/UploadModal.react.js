import React from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
import styles from '../../styles/recorder.css';

class UploadModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header>
          <div className={styles.uploadTitle}>Uploading your video</div>
        </Modal.Header>
        <Modal.Body>
          <ProgressBar active now={100} />
        </Modal.Body>
      </Modal>
    )
  }
}

export default UploadModal;