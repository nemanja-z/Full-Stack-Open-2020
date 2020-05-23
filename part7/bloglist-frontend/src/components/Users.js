import React from 'react'
import { useSelector } from 'react-redux'
import {
  Link
} from 'react-router-dom'
const Users = () => {
  const users = useSelector(state => state.users)
  return (
    < table >
      <thead>
        <tr>
          <th colSpan="2">User Number of Blogs</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => {
          return (<tr key={u.id}>
            <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
            <td>{u.blogs.length}</td>
          </tr>
          )
        })}
      </tbody>
    </table >

  )
}
export default Users

