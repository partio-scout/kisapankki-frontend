import axios from 'axios'
import tokenService from './token'
const baseUrl = `${process.env.REACT_APP_API_URL}/task`


const getTasks = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOneTask = async (id) => {
  const response = await axios.get(baseUrl/id)
  return response.data
}

const addtask = async (task) => {
  let config = null
  let token = tokenService.getToken()

  if (token) {
    config = {
      headers: { Authorization: token }
    }
  }

  const response = await axios.post(baseUrl, task, config)
  return response.data
}

export default { addtask, getTasks, getOneTask }
