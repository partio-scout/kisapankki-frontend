import axios from 'axios'
<<<<<<< HEAD
import tokenService from './token'
=======
>>>>>>> bf1b0b87e48e872dc0bd508d4c6f7f1c09a3bc07

const baseUrl = `${process.env.REACT_APP_API_URL}/comment`

const getComments = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const addComment = async (comment) => {
<<<<<<< HEAD
  let config = null
  const token = tokenService.getToken()

  if (token) {
    config = {
      headers: { Authorization: token }
    }
  }
 
  const response = await axios.post(baseUrl, comment, config)
=======
 
  const response = await axios.post(baseUrl, comment)
>>>>>>> bf1b0b87e48e872dc0bd508d4c6f7f1c09a3bc07
  return response.data
}

export default { getComments, addComment }