import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ handleCreation }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const addBlog = (event) => {
    event.preventDefault()
    handleCreation({'title': title, 'author': author, 'url': url})

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <br/>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
          <div>
            title
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
            type="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
    </div>
  )
}

NewBlogForm.propTypes = {
    handleCreation: PropTypes.func.isRequired
  }

export default NewBlogForm