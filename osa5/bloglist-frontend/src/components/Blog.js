import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
    
    likes {blog.likes}
    {" "}
    <button>like</button>
    <br/>

    {blog.author}
  </div>
  )
}

export default Blog
