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

const getSearchedTasks = async (search) => {
  const response = await axios.post(`${baseUrl}/search`, search)
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
      headers: { Authorization: token }
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

const acceptTask = async (id) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  }
  const response = await axios.put(`${baseUrl}/${id}/accept`, id, config)
  return response.data
}

const addRating = async (id, rating) => {

  const response = await axios.post(`${baseUrl}/${id}/rate`, rating)
  return response.data
}

const updateViews = async (id) => {
  const response = await axios.post(`${baseUrl}/${id}/views`)
  return response.data
}

const makePDF = async (formData, id) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    responseType: 'blob'
  }

  const response = await axios.post(`${baseUrl}/${id}/pdf`, formData, config)
  return response.data
}

const makePDFs = async (formData) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    responseType: 'blob'
  }

  const response = await axios.post(`${baseUrl}/pdf`, formData, config)
  return response.data
}

export default { addtask, getTasks, getOneTask, getSearchedTasks, updateTask, deleteTask, getPendingTasks, acceptTask, updateViews, addRating, makePDF, makePDFs }
