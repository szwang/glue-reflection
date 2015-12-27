'use strict';
import React from 'react';
// import Router from 'react-router';

console.log("test")
class About extends React.Component {
  constructor(props) {
    super(props);
    console.log('enter constructor')
  }

  render() {
    console.log('enter render')
    return (
      <div> Hello World 12345116!!!!</div>
    )
  }
}

export default About;
