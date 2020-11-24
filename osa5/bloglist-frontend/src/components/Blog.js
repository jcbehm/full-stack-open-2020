import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, setMessage, refresh }) => {
  const [view, setView] = useState(false)
  const [liked, setLiked] = useState(window.localStorage.getItem('liked-' + blog.id))

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const like = async () => {
    await blogService.like(blog)
    window.localStorage.setItem(
      ('liked-' + blog.id), true
    )
    setLiked(true)
    refresh()
  }

  const remove = async () => {
    if (window.confirm((`Remove blog ` + blog.title + ` by ` + blog.author + `?`))) {
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
      <div style={blogStyle} onClick={() => setView(true)}>
        {blog.title} {blog.author}
        {" "}
        <button onClick={() => setView(true)}>view</button>
      </div>
      )
  }

  return (
  <div style={blogStyle}>
    {blog.title} {blog.author}
    {" "}
    <button onClick={() => setView(false)}>hide</button>
    <br/>

    {blog.url}
    <br/>
    
    likes {blog.likes}
    {" "}
    {liked ? null : <button onClick={like}>like</button> }
    <br/>

    {blog.user.name}
    <br/>

    {blog.user.username === user.username ? <button onClick={remove}>remove</button> : null}
  </div>
  )
}

export default Blog
