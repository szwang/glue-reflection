'use strict';
import React from 'react';  
import Home from './pages/HomePage.react';

class App extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        {this.props.children || <Home />}
      </div>
    )
  }
}

module.exports = App;