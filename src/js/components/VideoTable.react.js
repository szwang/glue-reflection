import React from 'react';
import _ from 'lodash';
import VideoCell from './VideoCell.react';

const baseEl = 'reaction-';

class VideoRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
  }

  constructCells(videos) {
    return new Promise((resolve, reject) => {
      var videos = _.map(this.props.videos, (val, key) => {
        return (<td><VideoCell id={baseEl+key} src={val} key={key} /></td>)
      })
      resolve(videos);
    })
  }

  constructTable(array) {
    var result;
    var len = array.length;

    if(len === 12) {
      console.log(array)
      var source = <td><VideoCell id={baseEl+'12'} src={this.props.src}/></td>
      console.log('enter if statement', source);
      // insert video element with appropriate col and row spans
      array.splice(5, 0, source);
      console.log('completeArr', array)
      // select chunks of array to filter into appropriate rows
      //naive solution
      var row1 = _.slice(array, 0, 4);
      var row2 = _.slice(array, 4, 7);
      var row3 = _.slice(array, 7, 9);
      var row4 = _.slice(array, 9);

      return [  <VideoRow cells={row1} />,
                <VideoRow cells={row2} />,
                <VideoRow cells={row3} />,
                <VideoRow cells={row4} />  ];
    }
  }

  render() {
    var contents;

    this.constructCells(this.props.videos)
    .then((array) => {
      this.constructTable(array);
    })
    .then((table) => {
      console.log('table: ', table)
      contents = table;
      console.log('contents', contents)
    })

    return (
      <div>
      { contents ? 
        <table>
          {contents[0]}
          {contents[1]}
          {contents[2]}
          {contents[3]}
        </table> : null }
      </div>
    )
  }
}

export default VideoTable;



