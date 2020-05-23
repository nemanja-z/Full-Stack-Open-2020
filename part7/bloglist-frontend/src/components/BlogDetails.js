import React, { useState } from 'react'
import { likeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const BlogDetails = ({ blog, user, removeBlog }) => {
    const [likes, setLikes] = useState(blog.likes)
    const dispatch = useDispatch()

    if (!blog) return null

    const updateLikes = async (blog) => {
        blog.likes = blog.likes + 1
        dispatch(likeBlog(blog))
        setLikes(blog.likes)
    }
    const showRemove = () => {
        if (blog.user.name === user.username) {
            return <button onClick={() => removeBlog(blog)}>delete</button>

        }
    }
    return (
        <div key={blog.id}>
            <h2>{`${blog.title} ${blog.author}`}</h2>
            <p><u>{blog.url}</u></p>
            <div style={{ display: 'flex' }}>
                <p>{likes} likes</p>
                <button onClick={() => updateLikes(blog)}>like</button>
            </div>
            <p>{`added by ${blog.user.username}`}</p>
            {showRemove()}
        </div>
    )
}

export default BlogDetails
