import React from 'react';
import {
  Link
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';


const Users = ({users}) => {
  return (
    <>
    <h2>Users</h2>
    <Table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => 
          (<tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>))}
      </tbody>
    </Table>
    </>);
};

Users.propTypes={
  users:PropTypes.arrayOf(PropTypes.shape({
    username:PropTypes.string,
    name:PropTypes.string,
    token:PropTypes.string
  }))
};

export default Users;

