import React from 'react';
import styles from '../../styles/recorder.css';

// this is the component displaying the recording of the user
class Recorder extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div >
        <video className={styles.recorder} src={this.props.src} autoPlay muted/>
      </div>
    )
  }
}

export default Recorder;
