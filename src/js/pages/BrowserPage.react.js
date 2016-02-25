import React from 'react';
import _ from 'lodash';
// import styles from '../../'
import BrowserActionCreators from '../actions/BrowserActionCreators.js';
import BrowserStore from '../stores/BrowserStore';
import GifWall from '../components/GifWall.react';
import styles from '../../styles/browser.css';

class BrowserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: []
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
    console.log('state updated', this.state)
  }

  render() {
    return (
      <div>
        <GifWall className={styles.gifWall} gifs={this.state.gifs}/>
      </div>
    )
  }
}

module.exports = BrowserPage;