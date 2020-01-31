import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URL}/language`

const addLanguage = async (language) => {
  const response = await axios.post(baseUrl, language)
  return response.data
}

export default { addLanguage }