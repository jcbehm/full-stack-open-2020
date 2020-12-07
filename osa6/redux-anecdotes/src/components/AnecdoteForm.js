import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationCreate, notificationRemoval } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
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
        <br />
        <button type='submit'>create</button>
      </form>
      <br/>
    </div>
  )
}

export default NewAnecdote