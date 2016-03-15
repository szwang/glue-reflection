import React from 'react';
import _ from 'lodash';
import VideoCell from './VideoCell.react';
import styles from '../../styles/wall.css';
import Promise from 'bluebird';

const baseEl = 'reaction-';

class VideoRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr key={this.props.key}>
      {this.props.cells}
      </tr>
    )
  }
}

class VideoTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { table: null }
    console.log(this.props.width, "x", this.props.height)
  }

  componentWillReceiveProps(nextProps) {
    var videos = nextProps.videos
    if(videos) {
      return this.constructCells(videos)
      .then((array) => {
        return this.constructTable(array);
      })
      .then((table) => {
        this.setState({ table: table});
      })
    }
  }

  constructCells(videos) {
    return new Promise((resolve, reject) => {
      var cells =   _.map(videos, (val, key) => {
        return (<td style={{ height: this.props.height, width: this.props.width }}>
                  <VideoCell id={baseEl+key} src={val} key={key} />
                </td>)
      })
      resolve(cells);
    })
  }

  constructTable(array) {
    return new Promise((resolve, reject) => {
      var result;
      var len = array.length;

      if(len === 12) {
        var source = (<td style={{ height: this.props.height, width: this.props.width }} colSpan="2" rowSpan="2">
                        <VideoCell style={{ width: this.props.width * 2, height: this.props.height * 2 }} id={baseEl+'12'} src={this.props.src} key={12}/>
                      </td>)
        // insert video element with appropriate col and row spans
        array.splice(5, 0, source);
        // select chunks of array to filter into appropriate rows
        //naive solution
        var row1 = _.slice(array, 0, 4);
        var row2 = _.slice(array, 4, 7);
        var row3 = _.slice(array, 7, 9);
        var row4 = _.slice(array, 9);

        resolve([row1, row2, row3, row4]);
      }
    })
  }

  render() {

    setTimeout(() => {
      for(var i=this.props.videos.length; i>=0; i--) {
        document.getElementById(baseEl+i).play();
      }
    }, 4000)

    var rows = [];
    if(this.state.table) {
      for(var i=0; i<4; i++) {
        rows.push(<VideoRow key={i} cells={this.state.table[i]} />)
      }
    }

    return (
      <div className={styles.tableWrapper}>
      { this.state.table ? 
        <table style={{width: this.props.width * 4}}>
        <tbody>
        {rows}
        </tbody>
        </table> : <div>hi</div> }
      </div>
    )
  }
}

export default VideoTable;





