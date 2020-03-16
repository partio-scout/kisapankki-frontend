import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import languageService from '../services/language'

const Language = () => {
  const [languages, setLanguages] = useState([])
  const [languageName, setLanguageName] = useState('')
  const [modifiedLanguageName, setModifiedLanguageName] = useState('')
  const [modifiedLanguageId, setModifiedLanguageId] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [modifyVisible, setModifyVisible] = useState(false)

  useEffect(() => {
    languageService.getLanguages().then((response) => {
      setLanguages(response)
    })
  }, [])

  const handleLanguageAdd = async (event) => {
    event.preventDefault()
    try {
      const addedLanguage = await languageService.addLanguage({
        language: languageName,
      })
      setLanguageName('')
      setLanguages(languages.concat(addedLanguage))
    } catch (exception) {
      setErrorMessage('Kielen lisääminen ei onnistunut')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLanguageDelete = async (language) => {
    try {
      if (window.confirm(`Haluatko poistaa kielen: ${language.name}`)) {
        await languageService.deleteLanguage(language.id)
        setLanguages(languages.filter(l => l.id !== language.id))
      }
    } catch (exeption) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLanguageModify = async (event) => {
    event.preventDefault()
    const modifiedLanguage = { id: modifiedLanguageId, name: modifiedLanguageName }
    try {
      await languageService.editLanguage(modifiedLanguage)
      setModifyVisible(false)
      setLanguages(languages.map(language => language.id !== modifiedLanguage.id ? language : modifiedLanguage))
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const hideWhenModifyFormIsVisible = { display: modifyVisible ? 'none' : '' }
  const hideWhenAddingFormIsVisible = { display: modifyVisible ? '' : 'none' }


  const handleShowModify = (language) => {
    setModifyVisible(true)
    setModifiedLanguageId(language.id)
    setModifiedLanguageName(language.name)
  }

  return (
    <div className="language-form">
      <Notification message={errorMessage} type="error" />
      <form style={hideWhenModifyFormIsVisible} onSubmit={handleLanguageAdd}>
        <div>
          <input
            className="language"
            type="text"
            value={languageName}
            name="Language"
            placeholder="Uusi kieli"
            onChange={({ target }) => setLanguageName(target.value)}
          />
          <button type="submit" className="language-add-button">Lisää</button>
        </div>
      </form>

      {languages.map((language) => (
        <div style={hideWhenModifyFormIsVisible} className="language-list-item" key={language.id}>{language.name}

          <button style={hideWhenModifyFormIsVisible} onClick={() => handleLanguageDelete(language)}>Poista</button>
          <button style={hideWhenModifyFormIsVisible} onClick={() => handleShowModify(language)}>Muokkaa</button>

        </div>))
      }
      <div style={hideWhenAddingFormIsVisible} className="language-form-item">
        < form onSubmit={handleLanguageModify} >
          <div>
            <input
              className="language"
              type="text"
              value={modifiedLanguageName}
              name="Language"
              onChange={({ target }) => setModifiedLanguageName(target.value)}
            />
            <button type="submit" className="language-save-button">Tallenna</button>
            <button onClick={() => setModifyVisible(false)}>Peruuta</button>
          </div>

          <div>

          </div>
        </form>

      </div>


    </div>
  )
}


export default Language
