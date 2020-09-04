import React from 'react';
import { useField } from '../hooks/useField';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const title = useField('text');
  const url = useField('text');
  const author = useField('text');

  const addBlog = (e) => {
    e.preventDefault();
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0,
      comments: ''
    };
    createBlog(newBlog);
    title.reset();
    author.reset();
    url.reset();

  };
  return (
    <Form onSubmit={addBlog}>
      <Form.Group controlId="title">
        <Form.Label>title</Form.Label>
        <Form.Control {...title} reset='reset' />
      </Form.Group>
      <Form.Group controlId="author">
        <Form.Label>author</Form.Label>
        <Form.Control {...author} reset='reset' />
      </Form.Group>
      <Form.Group controlId="url">
        <Form.Label>url</Form.Label>
        <Form.Control {...url} reset='reset' />
      </Form.Group>
      <Button variant="primary" type="submit">
        create blog
      </Button>
    </Form>
  );
};

BlogForm.propTypes={
  createBlog:PropTypes.func.isRequired
};

export default BlogForm;

