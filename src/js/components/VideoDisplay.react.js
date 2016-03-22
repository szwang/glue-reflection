import React from 'react';
import styles from '../../styles/wall.css';
import VideoCell from './VideoCell.react';
import _ from 'lodash';

// // this component
// class MainVideo extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div className={styles.mainVideo}>
//       </div>
//     )
//   }
// }


class VideoDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    if(this.props.videos) { 

      var left = _.take(this.props.videos, 3);
      var right = _.takeRight(this.props.videos, 2);

      var leftCol = _.map(left, (val, key) => {
        return <VideoCell className={styles.vidCell} id={'reactL-'+key} src={val} key={key} />
      })

      var rightCol = _.map(right, (val, key) => {
        return <VideoCell className={styles.vidCell} id={'reactR-'+key} src={val} key={key} />
      })

    }

    return (
      <div className={styles.vidsWrapper}>
        <div><VideoCell id={'mainVideo'} className={styles.mainVideo} src={this.props.src}/></div>
        <div className={styles.vidColRight}>{rightCol}</div>
        <div className={styles.vidColLeft}>{leftCol}</div>
      </div>
    )
  }
}

export default VideoDisplay;

      