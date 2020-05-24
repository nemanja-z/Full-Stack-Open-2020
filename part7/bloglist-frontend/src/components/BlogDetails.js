import React, { useState } from 'react'
import { likeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import commentBlog from '../reducers/blogReducer'
import Comment from './Comment'
import { useField } from '../hooks/useField'


const BlogDetails = ({ blog, user, removeBlog }) => {
    const [likes, setLikes] = useState(blog.likes)
    const dispatch = useDispatch()
    const comment = useField('text')

    if (!blog) return null
    const addComment = () => {
        const { id } = blog
        let comm = { comment: comment.value }
        dispatch(commentBlog(id, comm))
    }
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
            <Comment addComment={addComment} comment={comment} />
        </div>
    )
}

export default BlogDetails
