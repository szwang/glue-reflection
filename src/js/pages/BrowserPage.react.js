import React from 'react';
import _ from 'lodash';
// import styles from '../../'
import BrowserActionCreators from '../actions/BrowserActionCreators.js';


class BrowserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    BrowserActionCreators.getGifs();
  }

  componentWillMount() {
    //add change listeners
    //call action to grab gifs
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>BrowserPage</div>
    )
  }
}

module.exports = BrowserPage;