import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URL}/addtask`

const addtask = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { addtask }
