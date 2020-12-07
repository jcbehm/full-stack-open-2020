const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

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
      return state.concat(asObject(action.data.content))

    case 'INIT_ANECDOTES':
      return action.data
    
    default:
      return state
  }
}

export const voteById = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default anecdoteReducer