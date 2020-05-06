import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import MockBlog from './MockBlog'

/*test('render content', () => {
    const blog = {
        title: 'Que te llamas',
        author: 'Horhe',
        url: 'rumbadebarcelona.com',
        likes: 54
    }
    const mockHandler = jest.fn()
    const { getByText } = render(
        <MockBlog blog={blog} onClick={mockHandler} />
    )
    const button = getByText('likes')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
})*/
test('like button fires after click', () => {
  const blog = {
    title: 'Que te llamas',
    author: 'Horhe',
    url: 'rumbadebarcelona.com',
    likes: 54
  }

  const clickMock = jest.fn()
  const component = render(<MockBlog blog={blog} onClick={clickMock} />)
  const button = component.container.querySelector('.like')

  fireEvent.click(button)
  fireEvent.click(button)

  expect(clickMock.mock.calls.length).toBe(2)
})