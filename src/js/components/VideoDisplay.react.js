import React from 'react';
import styles from '../../styles/wall.css';
import VideoCell from './VideoCell.react';
import Webcam from './Webcam.react';
import _ from 'lodash';
import { Col } from 'react-bootstrap';
import WallActionCreators from '../actions/WallActionCreators';

var cellStyle = {};

class VideoDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.calculateCellSize();
  }

  calculateCellSize() {
    var cellDiameter = window.innerHeight / 5;

    cellStyle.height = cellDiameter;
    cellStyle.width = cellDiameter;

  }

  render() {

    if(this.props.videos && !this.props.allVidsDone) { 

      var left = _.take(this.props.videos, 4);
      var right = _.takeRight(this.props.videos, 3);

      var leftCol = _.map(left, (val, key) => {
        return <VideoCell size={cellStyle} className={styles.vidCell} id={val} src={genVidSourceLink(val)} key={key} sourceVid={this.props.sourceVid}/>
      })

      var rightCol = _.map(right, (val, key) => {
        return <VideoCell size={cellStyle} className={styles.vidCell} id={val} src={genVidSourceLink(val)} key={key} sourceVid={this.props.sourceVid} />
      })

      rightCol.push(<Webcam key={2} size={cellStyle} className={styles.webcamCell}/>);

      console.log(rightCol)

    } else if(this.props.allVidsDone) {

      // render same videos, but with gifs/css transform styling 
      var left = _.take(this.props.videos, 4);
      var right = _.takeRight(this.props.videos, 3);

      var leftCol = _.map(left, (val, key) => {
        return <VideoCell size={cellStyle} gif={true} className={styles.vidCell} id={val} src={genGifSourceLink(val)} key={key} sourceVid={this.props.sourceVid}/>
      })

      var rightCol = _.map(right, (val, key) => {
        return <VideoCell size={cellStyle} gif={true} className={styles.vidCell} id={val} src={genGifSourceLink(val)} key={key} sourceVid={this.props.sourceVid} />
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
      