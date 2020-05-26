import React from 'react'
import { useField } from '../hooks/useField'
const BlogForm = ({ createBlog }) => {
  const title = useField('text')
  const url = useField('text')
  const author = useField('text')

  const addBlog = (e) => {
    e.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0,
      comments: ''
    }
    createBlog(newBlog)
    title.reset()
    author.reset()
    url.reset()

  }
  return (
    <form id='form' onSubmit={addBlog}>
      title:<input
        {...title}
        reset='reset' />
      author:<input
        {...author}
        reset='reset'
      />
      url:<input
        {...url}
        reset='reset' />
      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm
