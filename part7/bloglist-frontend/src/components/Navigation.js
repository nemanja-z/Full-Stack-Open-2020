import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {
  Link
} from 'react-router-dom';
const Navigation = ({ user, loggedOut }) => {
  const padding = {
    padding: 5
  };
  return (
    <div>
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
            <button onClick={loggedOut}>logout</button>

          </Nav>
        </Navbar.Collapse>
      </Navbar>

    </div>);
};

export default Navigation;