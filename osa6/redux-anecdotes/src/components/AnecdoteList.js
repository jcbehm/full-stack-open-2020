import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteById } from '../reducers/anecdoteReducer' 
import { notificationVote, notificationRemoval } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteById(anecdote.id))
    dispatch(notificationVote(anecdote.content))
    setTimeout(() => {
      dispatch(notificationRemoval())
    }, 5000)
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