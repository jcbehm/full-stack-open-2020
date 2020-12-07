import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes/'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(baseUrl + id)
  return response.data
}

const vote = async (id) => {
  const objectToVote = await getById(id)
  const votedObject = {...objectToVote, votes: (objectToVote.votes + 1)}
  const response = await axios.put(baseUrl + id, votedObject)
  return response.data
}

export default {
  getAll,
  createNew,
  vote
}