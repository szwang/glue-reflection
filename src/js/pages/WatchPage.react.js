import React from 'react';
import Recorder from '../components/Recorder.react';
import Video from '../components/GlueVideo.react';
import styles from '../../styles/global.css';

class WatchPage extends React.Component {
  render() {
    return (
      <div>
        <Video />
        <Recorder />
      </div>
    )
  } 
}

module.exports = WatchPage;
