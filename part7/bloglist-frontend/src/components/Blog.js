import React from 'react';
import {
  Link
} from 'react-router-dom';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';

const Blog = ({ blogs }) => {
  if (blogs === undefined) return null;

  return (
    <ListGroup className="nav flex-column" variant="flush">
    {blogs.map(blog=>
      <ListGroup.Item style={{border:"solid", borderColor: "red blue white", padding: 10 }} key={blog.id}>
      <Link className='list-group-item' to={`/blogs/${blog.id}`}>{`${blog.title} ${blog.author}`}</Link>
      </ListGroup.Item>)}
    </ListGroup>);
};
Blog.propTypes={
  blogs:PropTypes.arrayOf(PropTypes.shape({
    author:PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    likes:PropTypes.number.isRequired,
    url:PropTypes.string.isRequired,
    id:PropTypes.string.isRequired,
    comments:PropTypes.array,
    user:PropTypes.shape({
      username:PropTypes.string,
      name:PropTypes.string,
      token:PropTypes.string
    })})),
  user:PropTypes.shape({
      username:PropTypes.string.isRequired,
      name:PropTypes.string.isRequired,
      token:PropTypes.string
    })
}

export default Blog;
