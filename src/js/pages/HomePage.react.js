import React from 'react';
import { Button } from 'react-bootstrap';
import WelcomeMessage from '../components/WelcomeMessage.react';
import styles from '../../styles/home.css';
import Webcam from '../components/Webcam.react';

class HomePage extends React.Component {
  render() {
    return (
      <div >
        <WelcomeMessage />
        <Webcam />
      </div>
    )
  } 
}

module.exports = HomePage;
