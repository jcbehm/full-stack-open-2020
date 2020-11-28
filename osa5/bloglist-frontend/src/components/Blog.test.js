import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('when a normal blog is rendered', () => {
  let component
  let mockHandler
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
    mockHandler = jest.fn()
    component = render(
      <Blog blog={blog} user={{ username: 'tester' }} like={mockHandler} />
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
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    expect(component.container).toHaveTextContent(
      'https://fullstackopen.com/osa5/'
    )
    expect(component.container).toHaveTextContent(
      'likes'
    )
  })

  test('clicking the like-button twice calls the eventhandler twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})

