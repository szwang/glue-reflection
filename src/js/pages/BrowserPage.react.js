import React from 'react';
import _ from 'lodash';
// import styles from '../../'
import BrowserActionCreators from '../actions/BrowserActionCreators.js';
import BrowserStore from '../stores/BrowserStore';
import BrowserThumbnailContainer from '../components/BrowserThumbnailContainer.react';
import styles from '../../styles/browser.css';

class BrowserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [] //eg {id: 19302, video: 'sail-cat'}
    }
    this.updateGifs = this.updateGifs.bind(this);
  }

  componentWillMount() {
    BrowserActionCreators.getAllGifs();
    BrowserStore.addChangeListener(this.updateGifs);
  }

  componentDidMount() {

  }

  componentwillUnmount() {
    BrowserStore.removeChangeListener(this.updateGifs);
  }

  updateGifs() {
    this.setState({ gifs: BrowserStore.getGifs() });
  }

  render() {
    return (
      <div>
      <div className={styles.title}><h1>WATCH PEOPLE WATCH</h1> </div>
        <BrowserThumbnailContainer gifs={this.state.gifs}/>
      </div>
    )
  }
}

module.exports = BrowserPage;