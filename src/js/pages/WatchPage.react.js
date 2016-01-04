import React from 'react';
import VidWatchBox from '../components/VidWatchBox.react';
import UserRecordBox from '../components/UserRecordBox.react';

class WatchPage extends React.Component {
  render() {
    return (
      <div>
        <VidWatchBox />
        <UserRecordBox />
      </div>
    )
  } 
}

module.exports = WatchPage;
