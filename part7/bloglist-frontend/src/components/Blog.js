import React from 'react'
import {
  Link
} from 'react-router-dom'

const Blog = ({ blog }) => {
  if (blog === undefined) return null
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div className='blog' style={blogStyle}>
      <p><Link to={`/blogs/${blog.id}`}>{`${blog.title} ${blog.author}`}</Link></p>
    </div>)
}

export default Blog
