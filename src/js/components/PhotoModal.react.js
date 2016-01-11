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
  }

  submitPhoto() {
    ImageActionCreators.submitPhoto({imgURL: this.props.imgURL, user: this.state.user});
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
        <Modal.Header> <div className={styles.submitMessage}> Great! Take a look at your picture and enter your ID </div> </Modal.Header>
        <Modal.Body>
          <ResponsiveEmbed a4by3>
            <embed type="image/jpeg" src={this.props.imgURL} />
          </ResponsiveEmbed>
        </Modal.Body>
        <Modal.Footer>
          <Input
            type="text"
            value={this.state.user}
            placeholder="Enter your MTurk ID"
            ref="input"
            onChange={this.handleInputChange} />
          <Button onClick={this.submitPhoto}>Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default PhotoModal;