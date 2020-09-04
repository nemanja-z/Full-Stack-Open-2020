import React from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import {
  Link
} from 'react-router-dom';
import PropTypes from 'prop-types';


const Navigation = ({ user, loggedOut }) => {
  const padding = {
    padding: 5
  };
  return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {
                user
                  ? <em>{user.username} logged in</em>
                  : <Link to="/login">login</Link>
              }
            </Nav.Link>
            <Button onClick={loggedOut}>logout</Button>

          </Nav>
        </Navbar.Collapse>
      </Navbar>);
};

Navigation.propTypes={
  user:PropTypes.oneOfType([PropTypes.shape({
    username:PropTypes.string,
    name:PropTypes.string,
    token:PropTypes.string
  }),PropTypes.arrayOf(PropTypes.shape({
    username:PropTypes.string,
    name:PropTypes.string,
    token:PropTypes.string
  }))]),
  loggedOut:PropTypes.func.isRequired
};

export default Navigation;