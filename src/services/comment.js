import axios from 'axios'
import tokenService from './token'

const baseUrl = `${process.env.REACT_APP_API_URL}/comment`

const getComments = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const addComment = async (comment) => {
  let config = null
  const token = tokenService.getToken()

  if (token) {
    config = {
      headers: { Authorization: token }
    }
  }
 
  const response = await axios.post(baseUrl, comment, config)
  return response.data
}

export default { getComments, addComment }