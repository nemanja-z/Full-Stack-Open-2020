import React from 'react';
import { likeBlog } from '../reducers/blogReducer';
import { commentBlog, deleteBlog } from '../reducers/blogReducer';
import Comment from './Comment';
import { useField } from '../hooks/useField';
import { newMessage } from '../reducers/messageReducer';
import ListGroup  from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch} from 'react-redux';
import PropTypes from 'prop-types';


const BlogDetails = ({ blog, user, history}) => {
  const dispatch = useDispatch();
  const comment = useField('text');
  
  if (blog===undefined){ 
    history.push('/');
    return null;
  }
  const addComment = async (e) => {
    e.preventDefault();
    const { id } = blog;
    try{
      dispatch(commentBlog(id, comment.value));
      comment.reset();
    }catch(e){
      console.log(e.response.message);
    }
  };

  console.log(blog.user)
  const updateLikes = async (liked) => {
    try{
      dispatch(likeBlog(liked));
    }catch(e){
      console.log(e.response.message);
    }
  };
  const removeBlog = async (delBlog) => {
    if (window.confirm(`Do you really want to delete ${delBlog.title}`)) {
      try {
        dispatch(deleteBlog(delBlog));
        dispatch(newMessage(`${delBlog.title} has been removed`));
        history.push('/');
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  const authorize=blog.user.username === user.username;
  return (
    <div key={blog.id}>
      <h2>{`${blog.title} ${blog.author}`}</h2>
      <p>{blog.url}</p>
      <div style={{ display: 'flex' }}>
        <p>{blog.likes} likes</p>
        <button onClick={()=>updateLikes(blog)}>like</button>
      </div>
      <p>{`added by ${blog.user.username}`}</p>
      {authorize && <Button onClick={() => removeBlog(blog)}>delete</Button>}
      <Comment addComment={addComment} comment={comment} />
      <Card style={{ width: '18rem' }}>
        <Card.Title>Comments:</Card.Title>
        <ListGroup variant="flush">
          {blog.comments && blog.comments.map((comment, i) =>
            <ListGroup.Item key={i}>{comment}</ListGroup.Item>)}
        </ListGroup>
      </Card>

    </div>
  );
};
BlogDetails.propTypes={
  blog:PropTypes.shape({
    author:PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    likes:PropTypes.number.isRequired,
    url:PropTypes.string.isRequired,
    id:PropTypes.string,
    comments:PropTypes.array,
    user:PropTypes.shape({
      username:PropTypes.string,
      name:PropTypes.string,
      token:PropTypes.string
    })
  }),
  user:PropTypes.oneOfType([PropTypes.shape({
    username:PropTypes.string,
    name:PropTypes.string,
    token:PropTypes.string
  }),PropTypes.arrayOf(PropTypes.shape({
    username:PropTypes.string,
    name:PropTypes.string,
    token:PropTypes.string
  }))]),
  history:PropTypes.object.isRequired
}
export default BlogDetails;
