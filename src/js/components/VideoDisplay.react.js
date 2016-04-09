import React from 'react';
import styles from '../../styles/wall.css';
import VideoCell from './VideoCell.react';
import Webcam from './Webcam.react';
import _ from 'lodash';



class VideoDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    if(this.props.videos) { 

      var left = _.take(this.props.videos, 4);
      var right = _.takeRight(this.props.videos, 3);

      var leftCol = _.map(left, (val, key) => {
        return <div className={styles.vidCellWrapper}><VideoCell className={styles.vidCell} id={'reactL-'+key} src={val} key={key} /></div>
      })

      var rightCol = _.map(right, (val, key) => {
        return <div className={styles.vidCellWrapper}><VideoCell className={styles.vidCell} id={'reactR-'+key} src={val} key={key} /></div>
      })

      rightCol.push(<div className={styles.webcamWrapper}><Webcam key={2} className={styles.vidCell}/></div>);

    }

    return (
      <div>
        <div className={styles.mainVidWrapper}>
          <VideoCell id={'mainVideo'} className={styles.mainVideo} src={this.props.src}/>
        </div>
        <div className={styles.vidColRight}>{rightCol}</div>
        <div className={styles.vidColLeft}>{leftCol}</div>
      </div>
    )
  }
}

export default VideoDisplay;

      