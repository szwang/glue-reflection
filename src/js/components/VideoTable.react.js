import React from 'react';
import _ from 'lodash';
import VideoCell from './VideoCell.react';
import styles from '../../styles/wall.css';

const baseEl = 'reaction-';

class VideoRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('video row',this.props.cells)
    return (
      <tr>
      {this.props.cells}
      </tr>
    )
  }
}

class VideoTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { table: null }
  }

  componentWillReceiveProps(nextProps) {
    var videos = nextProps.videos
    if(videos) {
      return this.constructCells(videos)
      .then((array) => {
        console.log(array)
        return this.constructTable(array);
      })
      .then((table) => {
        this.setState({ table: table});
        console.log(this.state)
      })
    }
  }

  constructCells(videos) {
    return new Promise((resolve, reject) => {
      console.log('constructCells:',videos)
      var cells = _.map(videos, (val, key) => {
        return (<td className={styles.tableCell}><VideoCell id={baseEl+key} src={val} key={key} /></td>)
      })
      console.log(cells);
      resolve(cells);
    })
  }

  constructTable(array) {
    return new Promise((resolve, reject) => {
      var result;
      var len = array.length;
      console.log(array)

      if(len === 12) {
        console.log(array)
        var source = <td colSpan="2" rowSpan="2"><VideoCell id={baseEl+'12'} src={this.props.src}/></td>
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
    return (
      <div className={styles.tableWrapper}>
      { this.state.table ? 
        <table>
        <tbody>
          <VideoRow cells={this.state.table[0]} />
          <VideoRow cells={this.state.table[1]} />
          <VideoRow cells={this.state.table[2]} />
          <VideoRow cells={this.state.table[3]} />
        </tbody>
        </table> : <div>hi</div> }
      </div>
    )
  }
}

export default VideoTable;



