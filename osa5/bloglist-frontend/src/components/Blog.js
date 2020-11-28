import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, setMessage, refresh, like }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const ownLike = async () => {
    const likedBlog = await blogService.like(blog)
    refresh()
    return likedBlog
  }

  if (!like) {like = ownLike}

  const remove = async () => {
    if (window.confirm(('Remove blog ' + blog.title + ' by ' + blog.author + '?'))) {
      await blogService.remove(blog)
      setMessage('blog ' + blog.title + ' by ' + blog.author + ' removed')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      refresh()
    }
  }

  if (!view) {
    return (
      <div
        className='blog-init'
        style={blogStyle}
        onClick={() => setView(true)}
      >
        {blog.title} {blog.author}
        {' '}
        <button onClick={() => setView(true)}>view</button>
      </div>
    )
  }

  return (
    <div className='blog-ext' style={blogStyle}>
      {blog.title} {blog.author}
      {' '}
      <button onClick={() => setView(false)}>hide</button>
      <br/>

      {blog.url}
      <br/>

    likes {blog.likes}
      {' '}
      <button onClick={like}>like</button>
      <br/>

      {blog.user.name}
      <br/>

      {blog.user.username === user.username ? <button onClick={remove}>remove</button> : null}
    </div>
  )
}

export default Blog
