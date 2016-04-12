import React from 'react';
import styles from '../../styles/wall.css';
import VideoCell from './VideoCell.react';
import Webcam from './Webcam.react';
import _ from 'lodash';
import { Col } from 'react-bootstrap';
import WallActionCreators from '../actions/WallActionCreators';

var cellStyle = {};

var endPlayStyle = {
  transitionDelay: '2s',
  transition: '2s ease-in-out',
  cursor: 'pointer'
};

var transformUL = { transform: 'translate(56em, 22.2em)'};
var transformML = { transform: 'translate(30em, 0em)'};
var transformLL = { transform: 'translate(56em, -22em)'};
var transformUR = { transform: 'translate(-56em, 22.2em)'};
var transformMR = { transform: 'translate(-30em, 0em)'};
var transformLR = { transform: 'translate(-56em, -22.2em)'};

class VideoDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.calculateCellSize();
  }

  calculateCellSize() {
    var cellDiameter = window.innerHeight / 5;

    cellStyle.height = cellDiameter;
    cellStyle.width = cellDiameter;
    cellStyle.marginTop = cellDiameter / 8;
  }

  styleTransform(side, key) {
    if(side === 'r') {
      if(key === 0) {
        return _.merge({}, transformUR, endPlayStyle, cellStyle);
      } else if(key === 1 || key===2) {
        return _.merge({}, transformMR, endPlayStyle, cellStyle);
      }
    } else if(side === 'l') {
      if(key === 0) {
        return _.merge({}, transformUL, endPlayStyle, cellStyle);
      } else if(key === 1 || key === 2) {
        return _.merge({}, transformML, endPlayStyle, cellStyle);
      } else if(key === 3) {
        return _.merge({}, transformLL, endPlayStyle, cellStyle);
      }
    }
  }

  render() {
    var left = _.take(this.props.videos, 4);
    var right = _.takeRight(this.props.videos, 3);

    var leftCol, rightCol;

    if(this.props.videos && !this.props.allVidsDone) { 
      leftCol = _.map(left, (val, key) => {
        return <VideoCell size={cellStyle} className={styles.vidCell} id={val} src={genVidSourceLink(val)} key={key} sourceVid={this.props.sourceVid}/>
      })

      rightCol = _.map(right, (val, key) => {
        return <VideoCell size={cellStyle} className={styles.vidCell} id={val} src={genVidSourceLink(val)} key={key} sourceVid={this.props.sourceVid} />
      })

      rightCol.push(<Webcam key={7} size={cellStyle} className={styles.webcamCell}/>);

    } else if(this.props.allVidsDone) {

      leftCol = _.map(left, (val, key) => {
        console.log(key)
        let style = this.styleTransform('l', key);
        return <VideoCell size={style} className={styles.vidCell} id={val} src={genVidSourceLink(val)} key={key} sourceVid={this.props.sourceVid}/>
      })

      rightCol = _.map(right, (val, key) => {
        let style = this.styleTransform('r', key);
        return <VideoCell size={style} className={styles.vidCell} id={val} src={genVidSourceLink(val)} key={key} sourceVid={this.props.sourceVid} />
      })

      let camStyle = _.merge({}, transformLR, endPlayStyle, cellStyle)

      rightCol.push(<Webcam key={7} size={camStyle} className={styles.webcamCell}/>);

      setTimeout(() => {
        leftCol = _.map(left, (val, key) => {
          console.log(key)
          let style = this.styleTransform('l', key);
          return <VideoCell gif={true} size={style} className={styles.vidCell} id={val} src={genGifSourceLink(val)} key={key} sourceVid={this.props.sourceVid}/>
        })

        rightCol = _.map(right, (val, key) => {
          let style = this.styleTransform('r', key);
          return <VideoCell gif={true} size={style} className={styles.vidCell} id={val} src={genGifSourceLink(val)} key={key} sourceVid={this.props.sourceVid} />
        })

        let camStyle = _.merge({}, transformLR, endPlayStyle, cellStyle)

        rightCol.push(<Webcam key={7} size={camStyle} className={styles.webcamCell}/>);

      }, 5000)
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
      