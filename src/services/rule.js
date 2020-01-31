import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_API_URL}/rule`

const getRules = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getRules }
