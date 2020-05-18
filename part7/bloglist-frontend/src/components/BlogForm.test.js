import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')


  fireEvent.change(author, { target: { value: 'anonymous' } })
  fireEvent.change(title, { target: { value: 'testing of forms could be easier' } })
  fireEvent.change(url, { target: { value: 'react-testing-library.com' } })

  expect(author.value).toBe('anonymous')
  expect(title.value).toBe('testing of forms could be easier')
  expect(url.value).toBe('react-testing-library.com')
})