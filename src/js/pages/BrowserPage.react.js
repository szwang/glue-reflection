import React from 'react';
import _ from 'lodash';
// import styles from '../../'
import BrowserActionCreators from '../actions/BrowserActionCreators.js';
import BrowserStore from '../stores/BrowserStore';

class BrowserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs = []
    }
    this.updateGifs = this.updateGifs.bind(this);
    BrowserActionCreators.getGifs();
  }

  componentWillMount() {
    //add change listeners
    //call action to grab gifs
  }

  componentDidMount() {

  }

  updateGifs() {
    this.setState({ gifs: BrowserStore.getGifs() });
  }

  render() {
    return (
      <div>BrowserPage</div>
    )
  }
}

module.exports = BrowserPage;