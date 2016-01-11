import React from 'react';
import { Button } from 'react-bootstrap';
import WelcomeMessage from '../components/WelcomeMessage.react';
import styles from '../../styles/global.css';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1 className={styles.title}>Smile Recorder</h1>
        <WelcomeMessage />
      </div>
    )
  } 
}

module.exports = HomePage;
