import axios from 'axios'
import tokenService from './token'

const baseUrl = `${process.env.REACT_APP_API_URL}/ageGroup`

const getAgeGroups = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addAgeGroup = async (ageGroup) => {
  const config = {
    headers: { Authorization: tokenService.getToken() }
  }
  
  const response = await axios.post(baseUrl, ageGroup, config)
  return response.data
}

export default { addAgeGroup, getAgeGroups }
