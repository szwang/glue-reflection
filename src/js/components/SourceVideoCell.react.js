// component for individual video
import React from 'react';
import styles from '../../styles/browser.css';
import { Link } from 'react-router';

function genLink(id) {
  return "https://s3.amazonaws.com/recordrtc-test/gifs/" + id + ".gif";
}

class SourceVideoCell extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var link = genLink(this.props.id);
    return(
        <div>{this.props.video}</div>
    )
  }
}

export default SourceVideoCell;