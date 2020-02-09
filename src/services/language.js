import axios from 'axios'
import tokenService from './token'

const baseUrl = `${process.env.REACT_APP_API_URL}/language`

const getLanguages = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addLanguage = async (language) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  }

  const response = await axios.post(baseUrl, language, config)
  return response.data
}

export default { addLanguage, getLanguages }
