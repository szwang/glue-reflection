import React from 'react';
import { Button } from 'react-bootstrap';
import WelcomeMessage from '../components/WelcomeMessage.react';
import styles from '../../styles/home.css';
import Webcam from '../components/Webcam.react';
import _ from 'lodash';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      randomVid: null
    }

  }

  getVideoArray() {
    var arr;
    var firebaseRef = new Firebase('https://reactionwall.firebaseio.com/videos')
    firebaseRef.orderByKey().on('child_added', (snapshot) => {
      arr.push(snapshot.key());
    })
  }

  getRandomVideo() {

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
