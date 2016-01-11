import React from 'react';
import UserCaptureBox from '../components/UserCaptureBox.react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class CameraPage extends React.Component {
  render() {
    return (
      <div>
        <LinkContainer to={{ pathname: '/' }}>
          <Button>Back to Instructions</Button>
        </LinkContainer>
        <UserCaptureBox />
      </div>
    )
  } 
}

module.exports = CameraPage;
