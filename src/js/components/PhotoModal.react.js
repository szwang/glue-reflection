import React from 'react';
import ImageActionCreators from '../actions/ImageActionCreators';
import { Modal, Button, ResponsiveEmbed, Input } from 'react-bootstrap';
import styles from '../../styles/global.css';

class PhotoModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: null };

    this.submitPhoto = this.submitPhoto.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.generateID = this.generateID.bind(this);
  }

  generateID() {
    return Math.floor(Math.random()*90000) + 10000;
  }

  submitPhoto() {
    ImageActionCreators.submitPhoto({imgURL: this.props.imgURL, id: this.generateID() });
    this.props.onHide();
  }

  handleInputChange() {
    this.setState({
      user: this.refs.input.getValue()
    });
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header> <div className={styles.submitMessage}> Great! Take a look at your picture then hit submit. </div> </Modal.Header>
        <Modal.Body>
          <ResponsiveEmbed a4by3>
            <embed type="image/jpeg" src={this.props.imgURL} />
          </ResponsiveEmbed>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.submitPhoto}>Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default PhotoModal;