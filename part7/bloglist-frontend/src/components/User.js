import React from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';

const User = ({ user }) => {

  if (!user) return null;
  return (
    <div>
      <h3>{`Blogs added by: ${user.name}`}</h3>
      <ListGroup>
        {user.blogs.map(u =>
          <ListGroup.Item key={u.id}>{u.title}</ListGroup.Item>)}
      </ListGroup>
    </div>
  );
};

User.propTypes={
  user:PropTypes.shape({
    username:PropTypes.string,
    name:PropTypes.string,
    token:PropTypes.string
  })
}

export default User;