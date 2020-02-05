import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URL}/signup`

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addUser = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { addUser, getUsers }
