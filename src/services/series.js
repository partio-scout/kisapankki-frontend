import axios from 'axios'
import tokenService from './token'

const baseUrl = `${process.env.REACT_APP_API_URL}/series`

const getSeries = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addSeries = async (series) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  }

  const response = await axios.post(baseUrl, series, config)
  return response.data
}

const editSerie = async (serie) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  }
  
  const response = await axios.put(`${baseUrl}/${serie.id}`, serie, config)
  return response.data

}

const deleteSerie = async (id) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { addSeries, getSeries, deleteSerie, editSerie }
