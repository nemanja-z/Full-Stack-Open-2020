import React, { useState } from 'react';
import PropTypes from 'prop-types';


const Blog = ({ blog, user, removeBlog, updateLikes }) => {
  const [showAll, setShowAll] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
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
          <p data-testid='likes'>{blog.likes}</p>
          <button onClick={()=>updateLikes(blog)} className='like-update'>like</button>
        </div>
        {authorize&&<button onClick={()=>removeBlog(blog)}>delete</button>}
      </div>);
  }

  return (
    <div className='blog' style={blogStyle}>
      <p>{`${blog.title} ${blog.author}`}</p>
      <button onClick={toggleShow}>show more</button>
    </div>);
};
Blog.propTypes={
  blog:PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number
  }),
  user:PropTypes.shape({
    token:PropTypes.string,
    username:PropTypes.string,
    name:PropTypes.string}),
  removeBlog:PropTypes.func.isRequired,
  updateLikes:PropTypes.func.isRequired
};
export default Blog;
