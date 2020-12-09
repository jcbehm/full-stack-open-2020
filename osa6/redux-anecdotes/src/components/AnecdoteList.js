import React from 'react'
import { connect } from 'react-redux'
import { voteById } from '../reducers/anecdoteReducer' 
import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = (props) => {
  
  const vote = (anecdote) => {
    props.voteById(anecdote.id)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }

  return (
    props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes : state.anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(
      state.filter.toLowerCase()))
  } 
}

const mapDispatchToProps = {
  voteById,
  setNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes)

export default ConnectedAnecdotes