import axios from 'axios'
import tokenService from './token'

const baseUrl = `${process.env.REACT_APP_API_URL}/category`

const getCategories = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addCategory = async (cat) => {
  const config = {
    headers: { Authorization: tokenService.getToken() }
  }

  const response = await axios.post(baseUrl, cat, config)
  return response.data
}

export default { addCategory, getCategories }
