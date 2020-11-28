import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('when a normal blog is rendered', () => {
  let component
  const blog = {
    title: 'Component testing with react-testing-library',
    author: 'Full Stack Open 2020',
    url: 'https://fullstackopen.com/osa5/',
    user: {
      name: 'Jami',
      username: 'tester'
    }
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={{ username: 'tester' }} />
    )
  })

  test('renders title', () => {
    expect(component.container).toHaveTextContent(
      'Component testing with react-testing-library'
    )
  })

  test('renders author', () => {
    expect(component.container).toHaveTextContent(
      'Full Stack Open 2020'
    )
  })

  test('doesn´t render url', () => {
    expect(component.container).not.toHaveTextContent(
      'https://fullstackopen.com/osa5/'
    )
  })

  test('doesn´t render likes', async () => {
    expect(component.container).not.toHaveTextContent(
      'likes'
    )
  })

  test('clicking the view-button shows url and likes', () => {

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'https://fullstackopen.com/osa5/'
    )
    expect(component.container).toHaveTextContent(
      'likes'
    )
  })

})

