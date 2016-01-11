import React from 'react';
import { Button } from 'react-bootstrap';
import WelcomeMessage from '../components/WelcomeMessage.react';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <WelcomeMessage />
      </div>
    )
  } 
}

module.exports = HomePage;
