import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('render content', () => {
  const blog = {
    title: 'Que te llamas',
    author: 'Horhe',
    url: 'rumbadebarcelona.com',
    user: {
      username: "proba",
      name: "proba",
      id:"fdsfs232342ewfw34"
    },
    likes: 54
  };
  const user = {
    username: "proba",
    name: "proba",
    id:"fdsfs232342ewfw34"
  };
  const removeBlog=jest.fn();
  const component = render(
    <Blog user={user} blog={blog} removeBlog={removeBlog}/>
  );
  expect(component.container).toHaveTextContent('Que te llamas');
});
test('render url and likes', () => {
  const blog = {
    title: 'Que te llamas',
    author: 'Horhe',
    url: 'rumbadebarcelona.com',
    user: {
      username: "proba",
      name: "proba",
      id:"fdsfs232342ewfw34"
    },
    likes: 54
  };
  const user = {
    username: "proba",
    name: "proba",
    id:"fdsfs232342ewfw34"
  }
  const removeBlog=jest.fn();
  const component = render(
    <Blog user={user} blog={blog} removeBlog={removeBlog}/>
  );

  const button = component.getByText('show more');
  fireEvent.click(button);
  expect(
    component.container.querySelector('.more')
  ).toBeDefined();
});