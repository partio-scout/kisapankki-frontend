import axios from 'axios'
import tokenService from './token'

const baseUrl = `${process.env.REACT_APP_API_URL}/task`
const baseUrlPending = `${process.env.REACT_APP_API_URL}/task/pending`


const getTasks = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getPendingTasks = async () => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  }
  const response = await axios.get(baseUrlPending, config)
  return response.data
}

const getOneTask = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const addtask = async (task) => {
  let config = null
  const token = tokenService.getToken()

  if (token) {
    config = {
      headers: { Authorization: token },
    }
  }

  const response = await axios.post(baseUrl, task, config)
  return response.data
}

const updateTask = async (task) => {
  let config = null
  const token = tokenService.getToken()

  if (token) {
    config = {
      headers: { Authorization: token },
    }
  }

  const response = await axios.put(`${baseUrl}/${task.id}`, task, config)
  return response.data
}

const deleteTask = async (id) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}


export default { addtask, getTasks, getOneTask, updateTask, deleteTask, getPendingTasks }
