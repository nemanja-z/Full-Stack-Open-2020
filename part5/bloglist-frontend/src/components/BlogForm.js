import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')

  const handleTitleChange = e => {
    e.preventDefault()
    setNewTitle(e.target.value)
  }
  const handleAuthorChange = e => {
    e.preventDefault()
    setNewAuthor(e.target.value)
  }

  const handleUrlChange = e => {
    e.preventDefault()
    setNewUrl(e.target.value)
  }
  const addBlog = (e) => {
    e.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    createBlog(newBlog)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <form onSubmit={addBlog}>
            title:<input
        value={newTitle}
        onChange={handleTitleChange}
      />
          author:<input
        value={newAuthor}
        onChange={handleAuthorChange}
      />
          url:<input
        value={newUrl}
        onChange={handleUrlChange}
      />
      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm
