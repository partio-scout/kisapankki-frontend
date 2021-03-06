import React, { useState, Fragment } from 'react'
import Notification from '../misc/Notification'
import languageService from '../../services/language'

const Language = ({ languages, setLanguages }) => {
  const [languageName, setLanguageName] = useState('')
  const [modifiedLanguageName, setModifiedLanguageName] = useState('')
  const [modifiedLanguageId, setModifiedLanguageId] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [modifyVisible, setModifyVisible] = useState(false)

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

  const handleShowModify = (language) => {
    setModifyVisible(true)
    setModifiedLanguageId(language.id)
    setModifiedLanguageName(language.name)
  }

  return (
    <div className="language-form">
      <Notification message={errorMessage} type="error" />

      {languages && languages.map((language) => (
        <div className="language-list-item" key={language.id}>
          {modifyVisible && modifiedLanguageId === language.id ?
            <div className="language-form-item">
              <form onSubmit={handleLanguageModify} >
                <div className="item-modify">
                  <input
                    className="language"
                    type="text"
                    value={modifiedLanguageName}
                    name="Language"
                    onChange={({ target }) => setModifiedLanguageName(target.value)}
                  />
                  <div className="item-buttons-save">
                    <button type="submit" className="language-save-button">Tallenna</button>
                    <button onClick={() => setModifyVisible(false)}>Peruuta</button>
                  </div>
                </div>
              </form>
            </div>
            :
            <Fragment>
              <p className="item-name">{language.name}</p>
              <div className="item-buttons">
                <button onClick={() => handleShowModify(language)} className="modify-button">Muokkaa</button>
                <button onClick={() => handleLanguageDelete(language)} className="delete-button">Poista</button>
              </div>
            </Fragment>
            }
        </div>))
      }

      <form onSubmit={handleLanguageAdd} className="add-form">
        <div className="item-add">
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

    </div>
  )
}


export default Language
