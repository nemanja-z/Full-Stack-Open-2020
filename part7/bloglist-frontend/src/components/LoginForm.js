import React from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const LoginForm = ({ handleSubmit, username, password }) => {
  return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>username</Form.Label>
          <Form.Control {...username} reset='reset' />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control {...password} reset='reset' />
        </Form.Group>
        <Button id="login-button" variant="primary" type="submit">
          login
        </Button>
      </Form>
  );
};


LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
};
export default LoginForm;


