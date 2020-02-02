import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URL}/ageGroup`

const getAgeGroups = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const ageGroup = async (ageGroup) => {
  const response = await axios.post(baseUrl, ageGroup)
  return response.data
}

export default { ageGroup, getAgeGroups }
