import React from 'react';
import { Link } from 'react-router'

class WelcomeMessage extends React.Component {
  constructor(props) {
    super(props);

    this.submitPhoto = this.submitPhoto.bind(this);
  }

  submitPhoto() {
    ImageActionCreators.submitPhoto(this.props.imgURL);
    this.props.onHide();
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header> Thank you! Take a look at your picture </Modal.Header>
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

export default WelcomeMessage;