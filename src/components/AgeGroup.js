import React, { useState } from 'react'
import Notification from './Notification'
import ageGroupService from '../services/ageGroup'

const AgeGroup = () => {
  const [name, setName] = useState('')
  const [minAge, setMinAge] = useState('')
  const [maxAge, setMaxAge] = useState('')
  const [color, setColor] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleAgeGroupAdd = async (event) => {
    event.preventDefault()
    try {
      await ageGroupService.ageGroup({
        name, minAge, maxAge, color,
      })
      setName('')
      setMinAge('')
      setMaxAge('')
      setColor('')
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleMaxAge = (value) => {
    if (maxAge <= value) {
      setMaxAge(Number(value))
    }
  }

  return (
    <div className="age-group-form">
      <h2>Lisää ikäryhmä</h2>
      <Notification message={errorMessage} />
      <form onSubmit={handleAgeGroupAdd}>
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
        <div>
          <input
            className="minAge"
            type="number"
            value={minAge}
            name="MinAge"
            placeholder="Alaraja iälle"
            min="1"
            max="100"
            onChange={({ target }) => {
              setMinAge(target.value)
              handleMaxAge(target.value)
            }}
          />
        </div>
        <div>
          <input
            className="maxAge"
            type="number"
            value={maxAge}
            name="MaxAge"
            placeholder="Yläraja iälle"
            min={minAge}
            max="100"
            onChange={({ target }) => setMaxAge(target.value)}
          />
        </div>
        <div>
          <input
            className="color"
            type="text"
            value={color}
            name="Color"
            placeholder="Väri"
            onChange={({ target }) => setColor(target.value)}
          />
        </div>
        <button type="submit" className="age-group-submit-button">Lisää</button>
      </form>
    </div>
  )
}

export default AgeGroup
