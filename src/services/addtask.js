import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URL}/task`

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const addtask = async (task) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(config)
  console.log(token)

  const response = await axios.post(baseUrl, task, config)
  return response.data
}

export default { addtask, setToken }
