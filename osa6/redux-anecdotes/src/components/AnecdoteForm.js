import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationCreate, notificationRemoval } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(notificationCreate(content))
    setTimeout(() => {
      dispatch(notificationRemoval())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type='submit'>add</button>
      </form>
      <br/>
    </div>
  )
}

export default NewAnecdote