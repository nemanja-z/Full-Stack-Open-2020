import React, { useState } from 'react';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';


const Blog = ({ blog, user, removeBlog }) => {
  const [showAll, setShowAll] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const updateLikes = async (blog) => {
    blog.likes = blog.likes + 1;
    const result = await blogService.update(blog);
    setLikes(result.likes);
  }
  const authorize = blog.user.name === user.name;
  const toggleShow = () => setShowAll(!showAll);
  if (showAll) {
    return (
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
          <p data-testid='likes'>{likes}</p>
          <button onClick={() => updateLikes(blog)} className='like-update'>like</button>
        </div>
        {authorize&&<button onClick={() => removeBlog(blog)}>delete</button>}
      </div>)
  }

  return (
    <div className='blog' style={blogStyle}>
      <p>{`${blog.title} ${blog.author}`}</p>
      <button onClick={toggleShow}>show more</button>
    </div>)
}
Blog.propTypes={
  blog:PropTypes.object,
  user:PropTypes.object.isRequired,
  removeBlog:PropTypes.func.isRequired
};
export default Blog;
