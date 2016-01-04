import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div>This is the Home page</div>
        <Link to='/watch'><button> Begin Recording </button></Link>
      </div>
    )
  } 
}

module.exports = Home;
