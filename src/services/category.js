import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URL}/category`

const getCategories = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const category = async (cat) => {
  const response = await axios.post(baseUrl, cat)
  return response.data
}

export default { category, getCategories }
