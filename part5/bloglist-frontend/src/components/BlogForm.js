import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  const handleTitleChange = e => {
    e.preventDefault();
    setNewTitle(e.target.value);
  }
  const handleAuthorChange = e => {
    e.preventDefault();
    setNewAuthor(e.target.value);
  }

  const handleUrlChange = e => {
    e.preventDefault();
    setNewUrl(e.target.value);
  }
  const addBlog = async (e) => {
    e.preventDefault();
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    };
    await createBlog(newBlog);
    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  }
  return (
    <form id='form' onSubmit={addBlog}>
          title:<input
        id='title'
        value={newTitle}
        onChange={handleTitleChange}
      />
          author:<input
        id='author'
        value={newAuthor}
        onChange={handleAuthorChange}
      />
          url:<input
        id='url'
        value={newUrl}
        onChange={handleUrlChange}
      />
      <button type="submit">save</button>
    </form>
  )
}
BlogForm.propTypes={
  createBlog:PropTypes.func.isRequired
}
export default BlogForm;
