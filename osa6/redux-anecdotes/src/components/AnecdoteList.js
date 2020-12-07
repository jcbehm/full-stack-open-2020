import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteById } from '../reducers/anecdoteReducer' 
import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const anecdotes = useSelector(state =>
    state.anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(
        state.filter.toLowerCase())))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteById(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default Anecdotes