import React from 'react';

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
export default User;