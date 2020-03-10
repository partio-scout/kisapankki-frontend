import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URL}/file`

const addFiles = async (files) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  }

  const response = await axios.post(baseUrl, files, config)
  return response.data
}

export default { addFiles }
