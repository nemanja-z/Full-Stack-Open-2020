import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => {

  if (!user) return null;
  return (
    <div>
      <h3>{`Blogs added by: ${user.name}`}</h3>
      <ul>
        {user.blogs.map(u =>
          <li key={u.id}>{u.title}</li>)}
      </ul>
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