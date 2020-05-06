import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('render content', () => {
  const blog = {
    title: 'Que te llamas',
    author: 'Horhe',
    url: 'rumbadebarcelona.com',
    likes: 54
  }
  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).toHaveTextContent('Que te llamas')
})
test('render url and likes', () => {
  const blog = {
    title: 'Que te llamas',
    author: 'Horhe',
    url: 'rumbadebarcelona.com',
    likes: 54
  }
  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('show more')
  fireEvent.click(button)
  expect(
    component.container.querySelector('.more')
  ).toBeDefined()
})