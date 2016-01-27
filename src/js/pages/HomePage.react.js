import React from 'react';
import { Button } from 'react-bootstrap';
import WelcomeMessage from '../components/WelcomeMessage.react';
import styles from '../../styles/home.css';
import Webcam from '../components/Webcam.react';
import _ from 'lodash';
import VideoStore from '../stores/VideoStore';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { randomVid: null }
  }

  componentDidMount() {
    this.setState({ randomVid: VideoStore.getRandomVideo() });
  }

  render() {
    return (
      <div>
        <WelcomeMessage video={this.state.randomVid} />
        <Webcam />
      </div>
    )
  } 
}

module.exports = HomePage;
