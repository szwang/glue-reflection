import React from 'react';
import _ from 'lodash';
import styles from '../../styles/global.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap'; 

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
  }

  componentDidMount() {

  }

  componentwillUnmount() {
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">Link</NavItem>
          <NavItem eventKey={2} href="#">Link</NavItem>
        </Nav>
      </Navbar>
    )
  }
}

module.exports = Navigation;