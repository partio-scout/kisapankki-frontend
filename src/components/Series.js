import React, { useState } from 'react'
import { CirclePicker } from 'react-color'
import Notification from './Notification'
import seriesService from '../services/series'

const Series = () => {
  const [name, setName] = useState('')
  const [color, setColor] = useState('#ffffff')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSeriesAdd = async (event) => {
    event.preventDefault()
    try {
      await seriesService.addSeries({ name, color })
      setName('')
      setColor('')
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="series-form">
      <h2>Lisää sarja</h2>
      <Notification message={errorMessage} type="error" />
      <form onSubmit={handleSeriesAdd}>
        <div>
          <input
            className="name"
            type="text"
            value={name}
            name="Name"
            placeholder="Nimi"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div className="color-picker">
          <CirclePicker 
            color={color}
            onChangeComplete={color => setColor(color.hex)}
          />
        </div>
        <button type="submit" className="series-submit-button">Lisää</button>
      </form>
    </div>
  )
}

export default Series
