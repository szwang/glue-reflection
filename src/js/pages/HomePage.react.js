import React from 'react';
import { Button } from 'react-bootstrap';
import WelcomeMessage from '../components/WelcomeMessage.react';
import styles from '../../styles/home.css';
import Recorder from '../components/Recorder.react';

class HomePage extends React.Component {
  render() {
    return (
      <div >
        <WelcomeMessage />
        <Recorder />
      </div>
    )
  } 
}

module.exports = HomePage;
