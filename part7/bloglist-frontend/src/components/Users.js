import React from 'react'
import { useSelector } from 'react-redux'
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
                        <td>{u.name}</td>
                        <td>{u.blogs.length}</td>
                    </tr>
                    )
                })}
            </tbody>
        </table >





    )
}

export default Users
