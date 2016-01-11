import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

class WelcomeMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
        Hello! As part of a study in facial expressions, you will be presented with a webcam when you click the button below. 
        Please smile, press the "Take Photo" button to take a snapshot, then submit the photo once you are done.
        </div>
        <Button bsStyle="primary" bsSize="large" block>Go to Smile Recorder</Button>
        <div>
        We will not share, sell, or distribute your image.
        </div>
      </div>
    )
  }
}

export default WelcomeMessage;
