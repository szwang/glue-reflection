'use strict';
import React from 'react';  
import NavBar from './components/NavBar.react';

class App extends React.Component {
  render() {
    <div>
      <NavBar />
      {this.props.children}
    </div>
  }
}

module.exports = App;