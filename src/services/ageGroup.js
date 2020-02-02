import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URL}/ageGroup`

const ageGroup = async (ageGroup) => {
  const response = await axios.post(baseUrl, ageGroup)
  return response.data
}

export default { ageGroup }