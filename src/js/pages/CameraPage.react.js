import React from 'react';
import UserCaptureBox from '../components/UserCaptureBox.react';
import { Button } from 'react-bootstrap';
import styles from '../../styles/global.css'

class CameraPage extends React.Component {
  render() {
    return (
      <div>
        <UserCaptureBox />
      </div>
    )
  } 
}

module.exports = CameraPage;
