import React, { useState } from 'react'
import Notification from './Notification'
import userService from '../services/user'

const EditUser = ({ setShowEdit, user, setUser, setMessage }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [nameErrorMessage, setNameErrorMessage] = useState(null)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState(null)
  const [name, setName] = useState(user.name)
  const [username, setUsername] = useState(user.username)

  const handleEditUser = async (event) => {
    event.preventDefault()
    setNameErrorMessage(null)
    setUsernameErrorMessage(null)
    if (name.length < 3) {
      setNameErrorMessage('Nimessä pitää olla vähintään 3 kirjainta')
    }
    if (username.length < 3) {
      setUsernameErrorMessage('Käyttäjätunnuksessa pitää olla vähintään 3 kirjainta')
    }
    if (name.length < 3 || username.length < 3) {
      return
    }
    try {
      const editedUser = await userService.editUser({
        name, username
      })
      setUser(editedUser)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(editedUser),
      )
      setShowEdit(false)
      setMessage('Tietoja muokattu!')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error && error.response.data.error === "username already exists") {
        setErrorMessage('Käyttäjätunnus on varattu')
      } else {
        setErrorMessage('Muokkaaminen epäonnistui')
      }
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="edit-user-form">
      <h2>Omat tiedot</h2>
      <Notification message={errorMessage} type="error" />
      <form onSubmit={handleEditUser}>
        <div>
          <Notification message={nameErrorMessage} type="error" />
          <label>Nimi</label><br/>
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
          <Notification message={usernameErrorMessage} type="error" />
          <label>Käyttäjätunnus</label><br/>
          <input
            className="username"
            type="text"
            value={username}
            name="Username"
            placeholder="Käyttäjätunnus"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <button type="submit" className="edit-button">Tallenna</button>
        <button onClick={() => setShowEdit(false)} className="cancel-button">Peruuta</button>
      </form>
    </div>
  )
}

export default EditUser
