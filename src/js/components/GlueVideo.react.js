import React from 'react';
import styles from '../../styles/recorder.css';

var style = { height: '100%', margin: '0 auto', display: 'block' };

class GlueVideo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showSource: false }
    /**Note: this is a little hacky because
    "Dynamically modifying a source element and its attribute when the element 
    is already inserted in a video or audio element will have no effect."

    So we can't just insert the source into the video once received from the db. 
    https://html.spec.whatwg.org/multipage/embedded-content.html#the-source-element
    **/
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
    if(nextProps.src) {
      console.log('nextProps', nextProps.src);
      this.setState({ showSource: true })
    }
  }

  render() {

    return (
      <div className={styles.vidContainer}>
          {this.state.showSource ? 
          <video className={styles.glueVid} id="glueStream">
            <source src={this.props.src} type="video/mp4" />
          </video> :
          null }
        {this.props.showPlayButton ? 
            <img onClick={this.props.clickPlay} className={styles.playImg} src="/assets/playButton.png"/> : 
          null }
      </div>
    )
  } 
}

module.exports = GlueVideo;
