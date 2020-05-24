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
      likes: 0
    }
    createBlog(newBlog)
    title.reset()
    author.reset()
    url.reset()

  }

  return (
    <form id='form' onSubmit={addBlog}>
      title:<input
        value={title.value}
        type={title.type}
        onChange={title.onChange}
        reset={title.reset} />
          author:<input
        value={author.value}
        type={author.type}
        onChange={author.onChange}
        reset={author.reset}
      />
          url:<input
        value={url.value}
        type={url.type}
        onChange={url.onChange}
        reset={url.reset} />
      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm
