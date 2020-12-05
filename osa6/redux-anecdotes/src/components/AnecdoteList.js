import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteById } from '../reducers/anecdoteReducer' 


const Anecdotes = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteById(id))
  }

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )
  )
}

export default Anecdotes