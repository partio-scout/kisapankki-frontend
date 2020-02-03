import axios from 'axios'
import tokenService from './token'

const baseUrl = `${process.env.REACT_APP_API_URL}/rule`

const getRules = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addRule = async (rule) => {
  const config = {
    headers: { Authorization: tokenService.getToken() }
  }

  const response = await axios.post(baseUrl, rule, config)
  return response.data
}

export default { addRule, getRules }