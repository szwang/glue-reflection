'use strict';
import React from 'react';  
import NavBar from './components/NavBar.react';
import Home from './pages/HomePage.react';

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        {this.props.children || <Home />}
      </div>
    )
  }
}

module.exports = App;