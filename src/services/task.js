import axios from 'axios'
import tokenService from './token'

const baseUrl = `${process.env.REACT_APP_API_URL}/task`

const addtask = async (task) => {
  let config = null
  let token = tokenService.getToken()

  if (token) {
    config = {
      headers: { Authorization: token }
    }
  }

  const response = await axios.post(baseUrl, task, config)
  return response.data
}

export default { addtask }
