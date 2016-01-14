import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styles from '../../styles/home.css';

class WelcomeMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div >
        <div className={styles.instructions}>
        Hello! As part of a study in facial expressions, you will be presented with a video when you click the button below. 
        Please make sure your face is visible to your webcam, square in the frame on the bottom right of the screen. 
        When you click play, watch the video and act natural. The video will stop automatically.
        Once the video upload is complete, you will be presented with a code to complete the HIT.
        </div>
        <LinkContainer to={{ pathname: '/watch' }}>
          <Button bsStyle="primary" bsSize="large" block>Go to Reaction Recorder</Button>
        </LinkContainer>
        <div className={styles.securityMessage}>
        We will not share, sell, or distribute your video.
        </div>
      </div>
    )
  }
}

export default WelcomeMessage;
