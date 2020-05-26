import React, { useState } from 'react'
import { likeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { commentBlog, deleteBlog } from '../reducers/blogReducer'
import Comment from './Comment'
import { useField } from '../hooks/useField'
import { useHistory } from 'react-router-dom'
import { newMessage } from '../reducers/messageReducer'
import { Card, ListGroup } from 'react-bootstrap'




const BlogDetails = ({ blog, user }) => {
    const [likes, setLikes] = useState(blog.likes)
    const dispatch = useDispatch()
    const comment = useField('text')
    const history = useHistory()
    if (!blog) return null

    const addComment = async (e) => {
        e.preventDefault()
        const { id } = blog
        dispatch(commentBlog(id, comment.value))
        comment.reset()
    }


    const updateLikes = async (blog) => {
        blog.likes = blog.likes + 1
        dispatch(likeBlog(blog))
        setLikes(blog.likes)
    }
    const removeBlog = async (blog) => {
        if (window.confirm(`Do you really want to delete ${blog.title}`)) {
            try {
                dispatch(deleteBlog(blog))
                dispatch(newMessage(`${blog.title} has been removed`))
                history.push('/')
            } catch (exception) {
                console.log(exception)
            }
        }
    }
    const showRemove = () => {
        if (blog.user.username === user.username) {
            return <button onClick={() => removeBlog(blog)}>delete</button>

        }
    }
    return (
        <div key={blog.id}>
            <h2>{`${blog.title} ${blog.author}`}</h2>
            <p>{blog.url}</p>
            <div style={{ display: 'flex' }}>
                <p>{likes} likes</p>
                <button onClick={() => updateLikes(blog)}>like</button>
            </div>
            <p>{`added by ${blog.user.username}`}</p>
            {showRemove()}
            <Comment addComment={addComment} comment={comment} />
            <Card style={{ width: '18rem' }}>
                <Card.Title>Comments:</Card.Title>
                <ListGroup variant="flush">
                    {blog.comments.map((b, i) =>
                        <ListGroup.Item key={i}>{b}</ListGroup.Item>)}
                </ListGroup>
            </Card>

        </div>
    )
}

export default BlogDetails

{/* <ul>
{blog.comments.map((b, i) =>
    <li key={i}>{b}</li>
)}
</ul> */}