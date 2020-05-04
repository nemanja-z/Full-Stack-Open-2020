import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('render content', () => {
  const blog = {
    title: 'Que te llamas',
    author: 'Horhe',
    url: 'affffffffff',
    likes: 50
  }
  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).toHaveTextContent('Que te llamas')
})
test('render likes and url on click', () => {
  const blog = {
    title: 'Que te llamas',
    author: 'Horhe',
    url: 'affffffffff',
    likes: 50
  }
  const mockHandler = jest.fn()
  const component = render(
    <Blog blogs={blog} toggle={mockHandler} />
  )
  const button = component.getByText('show less')
  fireEvent.click(button)

  const div = component.container.querySelector('.blogs')
  expect(div).toHaveTextContent('affffffffff')
})