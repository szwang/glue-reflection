// component for individual video
import React from 'react';
import styles from '../../styles/browser.css'

function genLink(id) {
  return "https://s3.amazonaws.com/recordrtc-test/gifs/" + id + ".gif";
}

class GifCell extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var link = genLink(this.props.id);
    return(
      <img className={styles.gifCell} src={link}/>
    )
  }
}

export default GifCell;