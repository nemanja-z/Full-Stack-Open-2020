import axios from 'axios'
const baseUrl = '/api/blogs'

const setToken = () => {
  let user = JSON.parse(window.localStorage.getItem('loggedUser')).token
  let token = `bearer ${user}`
  return { headers: { Authorization: token } }
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const remove = async (data) => {
  const response = await axios.delete(`${baseUrl}/${data.id}`, setToken())
  return response.data
}
const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, setToken())
  return response.data
}

const update = async (data) => {
  const response = await axios.put(`${baseUrl}/${data.id}`, data, setToken())
  return response.data
}

export default { getAll, create, update, setToken, remove }