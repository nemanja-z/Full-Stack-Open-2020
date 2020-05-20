import axios from 'axios'
const baseUrl = '/api/users'


const initUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { initUsers }