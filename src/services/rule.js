import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URL}/rule`

const rule = async (nnononono) => {
  const response = await axios.post(baseUrl, nnononono)
  return response.data
}

export default { rule }