import React from 'react';
import styles from '../../styles/wall.css';
import VideoCell from './VideoCell.react';
import Webcam from './Webcam.react';
import _ from 'lodash';
import { Col } from 'react-bootstrap';
import WallActionCreators from '../actions/WallActionCreators';

var cellSize = {}

class VideoDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  calculateCellSize() {
    var cellDiameter = window.innerHeight / 5;

    cellSize.height = cellDiameter;
    cellSize.width = cellDiameter;
  }

  render() {

    if(this.props.videos && !this.props.allVidsDone) { 

      var left = _.take(this.props.videos, 4);
      var right = _.takeRight(this.props.videos, 3);

      var leftCol = _.map(left, (val, key) => {
        return <div className={styles.vidCellWrapper}><VideoCell size={cellSize} className={styles.vidCell} id={val} src={genVidSourceLink(val)} key={key} sourceVid={this.props.sourceVid}/></div>
      })

      var rightCol = _.map(right, (val, key) => {
        return <div className={styles.vidCellWrapper}><VideoCell size={cellSize} className={styles.vidCell} id={val} src={genVidSourceLink(val)} key={key} sourceVid={this.props.sourceVid} /></div>
      })

      rightCol.push(<div className={styles.webcamWrapper}><Webcam key={2} size={cellSize} className={styles.vidCell}/></div>);

    } else if(this.props.allVidsDone) {

      // render same videos, but with gifs/css transform styling 
      console.log('allVidsDone')
      var left = _.take(this.props.videos, 4);
      var right = _.takeRight(this.props.videos, 3);

      var leftCol = _.map(left, (val, key) => {
        return <div className={styles.vidCellWrapper}><VideoCell gif={true} className={styles.vidCell} id={val} src={genGifSourceLink(val)} key={key} sourceVid={this.props.sourceVid}/></div>
      })

      var rightCol = _.map(right, (val, key) => {
        return <div className={styles.vidCellWrapper}><VideoCell gif={true} className={styles.vidCell} id={val} src={genGifSourceLink(val)} key={key} sourceVid={this.props.sourceVid} /></div>
      })

    }

    return (
      <div>
        <div className={styles.displayWrapper}>
          <div className={styles.mainVidWrapper}>
            <VideoCell id={'mainVideo'} className={styles.mainVideo} src={this.props.src}/>
          </div>
          <div className={styles.reactColWrapper}>
            <Col className={styles.leftCol} md={3} lg={3}> {leftCol} </Col>
            <Col md={3} lg={3}> </Col>
            <Col md={3} lg={3}> </Col>
            <Col className={styles.rightCol} md={3} lg={3}> {rightCol} </Col>
          </div>
        </div>
      </div>
    )
  }
}

function genVidSourceLink(id) {
  return 'https://s3.amazonaws.com/recordrtc-test/' + id + '.webm';
}

function genGifSourceLink(id) {
  return 'https://s3.amazonaws.com/recordrtc-test/gifs/' + id + '.gif'
}

export default VideoDisplay;

        //<div className={styles.vidColRight}>{rightCol}</div>
        //<div className={styles.vidColLeft}>{leftCol}</div>
      