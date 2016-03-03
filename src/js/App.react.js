'use strict';
import React from 'react';  
import Home from './pages/HomePage.react';
import styles from '../styles/global.css';
import NavBar from './components/NavBar.react';

class App extends React.Component {
  render() {
    return (
      <NavBar />
      <div className={styles.appWrapper}>
        {this.props.children || <Home />}
      </div>
    )
  }
}

module.exports = App;