import React from 'react';

const MockBlog = ({ blog, onClick }) => {
  return (
    <div>
      <div>
        <div>{`${blog.title} ${blog.author}`}</div>
      </div>
      <div>
        <p>{blog.likes}</p>
        <button onClick={onClick} className='like'>likes</button>
      </div>
    </div>
  );
};

export default MockBlog;
