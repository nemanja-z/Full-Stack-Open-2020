import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ user, blog, removeBlog }) => {
  const [showAll, setShowAll] = useState(false)
  const [likes, setLikes] = useState(blog.likes)


  const showDelete = () => {
    if (blog.user.id.toString() === user.id.toString()) {
      return (
        <div>
          <button type="button" onClick={() => removeBlog(blog)}>Delete</button>
        </div>
      )
    }

    return null
  }
  const updateLikes = async (blog) => {
    blog.likes = blog.likes + 1
    const result = await blogService.update(blog)
    setLikes(result.likes)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleShow = () => setShowAll(!showAll)
  if (showAll) {

    <div className='blog' style={blogStyle}>
      <button onClick={toggleShow}>show less</button>
      <div>
        <p>{blog.title}</p>
      </div>
      <div>
        <p>{blog.author}</p>
      </div>
      <div className='more'>
        <p>{blog.url}</p>
      </div>
      <div style={{ display: 'flex' }} className='more'>
        <p>{likes}</p>
        <button onClick={() => updateLikes(blog)}>like</button>
      </div>
      {showDelete}
    </div>
  }

  return (
    <div className='blog' style={blogStyle}>
      <p>`${blog.title} ${blog.author}`</p>
      <button onClick={toggleShow}>show more</button>
    </div>)
}
export default Blog
