import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URL}/category`

const category = async (cat) => {
    const response = await axios.post(baseUrl, cat)
    return response.data
}

export default { category }

