import React, { useState } from 'react'
import Notification from './Notification'
import languageService from '../services/language'

const Language = () => {
  const [language, setLanguage] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLanguageAdd = async (event) => {
    event.preventDefault()
    try {
      await languageService.addLanguage({
        language,
      })
      setLanguage('')
    } catch (exception) {
      setErrorMessage('Kielen lisääminen ei onnistunut')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="language-form">
      <h2>Lisää kieli</h2>
      <Notification message={errorMessage} type="error" />
      <form onSubmit={handleLanguageAdd}>
        <div>
          <input
            className="language"
            type="text"
            value={language}
            name="Language"
            placeholder="Kieli"
            onChange={({ target }) => setLanguage(target.value)}
          />
        </div>
        <button type="submit" className="language-add-button">Lisää</button>
      </form>
    </div>
  )
}


export default Language
