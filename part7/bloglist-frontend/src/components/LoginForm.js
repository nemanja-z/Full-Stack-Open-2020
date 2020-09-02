import React from 'react';
import { Form, Button } from 'react-bootstrap';

import PropTypes from 'prop-types';

const LoginForm = ({ handleSubmit, username, password }) => {
  return (
    < div >
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>username</Form.Label>
          <Form.Control {...username} reset='reset' />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control {...password} reset='reset' />
        </Form.Group>
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div >
  );
};


LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
};
export default LoginForm;


/* < Form onSubmit = { handleSubmit } >
    <Form.Group>
      <Form.Label>username:</Form.Label>
      <Form.Control
        {...username}
        reset='reset'
      />
      <Form.Label>password:</Form.Label>
      <Form.Control
        {...password}
        reset='reset'
      />
      <Button variant="primary" type="submit">
        login
  </Button>
    </Form.Group>
</Form > */