import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('when a normal blog is rendered', () => {
  const blog = {
    title: 'Component testing with react-testing-library',
    author: 'Full Stack Open 2020',
    url: 'https://fullstackopen.com/osa5/'
  }

  test('renders title', () => {
    const component = render(
      <Blog blog={ blog } />
    )
    expect(component.container).toHaveTextContent(
      'Component testing with react-testing-library'
    )
  })

  test('renders author', () => {
    const component = render(
      <Blog blog={ blog } />
    )
    expect(component.container).toHaveTextContent(
      'Full Stack Open 2020'
    )
  })

  test('doesn´t render url', () => {
    const component = render(
      <Blog blog={ blog } />
    )
    expect(component.container).not.toHaveTextContent(
      'https://fullstackopen.com/osa5/'
    )
  })

  test('doesn´t render likes', () => {
    const component = render(
      <Blog blog={ blog } />
    )
    expect(component.container).not.toHaveTextContent(
      'likes'
    )
  })
})

