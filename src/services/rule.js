import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URL}/rule`

const rule = async (rule) => {
  const response = await axios.post(baseUrl, rule)
  return response.data
}

export default { rule }