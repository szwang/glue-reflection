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
      <div className={styles.welcomeBox}>
        <h1 className={styles.title}>Reaction Recorder</h1>
        <div className={styles.instructions}>
        <p>Hello! As part of a study in facial expressions, you will be presented with a video when you click the button below.</p> 
        <p>Please make sure your speakers are ON, and your face is visible to your webcam, square in the frame on the bottom right of the screen. </p>
        <p>When you click play, watch the video and act natural. The video will stop automatically. </p>
        <p>Once the video upload is complete, you will be presented with a code to complete the HIT.</p>
        </div>
        {this.props.video ? 
          <LinkContainer to={{ pathname: '/watch/' + this.props.video }}>
            <Button bsStyle="primary" bsSize="large" block>Go to Reaction Recorder</Button>
          </LinkContainer> :
          <Button bsStyle="primary" disabled/>}
        <div className={styles.securityMessage}>
        </div>
      </div>
    )
  }
}

export default WelcomeMessage;
