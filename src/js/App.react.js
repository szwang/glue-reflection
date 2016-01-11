'use strict';
import React from 'react';  
import Home from './pages/HomePage.react';

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children || <Home />}
      </div>
    )
  }
}

module.exports = App;