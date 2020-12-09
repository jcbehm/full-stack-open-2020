import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  const byVotes = ((a, b) => b.votes - a.votes)
  let newState = null

  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(n => n.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      newState = state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote)
      newState.sort(byVotes)
      return newState

    case 'CREATE':
      return state.concat(action.data)

    case 'INIT_ANECDOTES':
      newState = [...action.data]
      newState.sort(byVotes)
      return newState
    
    default:
      return state
  }
}

export const voteById = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
    
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer