import React from 'react'
import {
    Link
} from 'react-router-dom'
const Navigation = ({ user, loggedOut }) => {
    const padding = {
        padding: 5
    }
    return (
        <div>
            {user && (<div style={{ display: 'flex' }}>
                <h2>{`${user.name} is logged in`}</h2>
                <button onClick={loggedOut}>logout</button>
            </div>)
            }
            <Link style={padding} to='/'>blogs</Link>
            <Link style={padding} to='/users'>users</Link>
        </div >
    )
}


export default Navigation