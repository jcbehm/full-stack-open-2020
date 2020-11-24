import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
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
  }

  if (!view) {
    return (
      <div style={blogStyle} onClick={() => setView(true)}>
        {blog.title}
        {" "}
        <button onClick={() => setView(true)}>view</button>
      </div>
      )
  }

  return (
  <div style={blogStyle}>
    {blog.title}
    {" "}
    <button onClick={() => setView(false)}>hide</button>
    <br/>

    {blog.url}
    <br/>
    
    likes {liked ? blog.likes + 1 : blog.likes}
    {" "}
    {liked ? null : <button onClick={like}>like</button> }
    <br/>

    {blog.author}
  </div>
  )
}

export default Blog
