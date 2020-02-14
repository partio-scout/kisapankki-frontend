import axios from 'axios'
import tokenService from './token'

const baseUrl = `${process.env.REACT_APP_API_URL}/user`

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addUser = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const editUser = async (user) => {
  const config = {
    headers: { Authorization: tokenService.getToken() }
  }

  const response = await axios.put(baseUrl, user, config)
  return response.data
}

export default { addUser, getUsers, editUser }
