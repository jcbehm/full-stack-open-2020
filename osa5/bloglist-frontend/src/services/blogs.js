import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs/'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete((baseUrl + newObject.id), config)
  return response.data
}

const like = async newObject => {
  const likedObject = ({ ...newObject, likes: (newObject.likes + 1) })
  const response = await axios.put((baseUrl + likedObject.id), likedObject)
  return response.data
}

export default { getAll, create, setToken, remove, like }