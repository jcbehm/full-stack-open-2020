import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'

test('when a new blog is created, the form calls a callback-function with correct props', () => {
  const handleCreation = jest.fn()

  const component = render(
    <NewBlogForm handleCreation={handleCreation} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Maailmanmatkaajan muistelmat' }
  })
  fireEvent.change(author, {
    target: { value: 'Chad Tyler' }
  })
  fireEvent.change(url, {
    target: { value: 'http://www.merrygoroundtheworld.com/' }
  })
  fireEvent.submit(form)

  expect(handleCreation.mock.calls).toHaveLength(1)
  expect(handleCreation.mock.calls[0][0].title).toBe('Maailmanmatkaajan muistelmat' )
  expect(handleCreation.mock.calls[0][0].author).toBe('Chad Tyler' )
  expect(handleCreation.mock.calls[0][0].url).toBe('http://www.merrygoroundtheworld.com/' )
})