import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_API_URL}/signup`

const signup = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  console.log(baseUrl)
  return response.data
}

export default { signup }