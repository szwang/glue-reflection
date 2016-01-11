'use strict';
import React from 'react';  
import Home from './pages/HomePage.react';
import styles from '../styles/global.css';

class App extends React.Component {
  render() {
    return (
      <div className={styles.appWrapper}>
        {this.props.children || <Home />}
      </div>
    )
  }
}

module.exports = App;