import React, { useState } from 'react'
import Notification from '../misc/Notification'
import userService from '../../services/user'

const EditUser = ({ setShowEdit, user, setUser, setMessage }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [nameErrorMessage, setNameErrorMessage] = useState(null)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState(null)
  const [emailErrorMessage, setEmailErrorMessage] = useState(null)
  const [name, setName] = useState(user.name)
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [allowNotifications, setAllowNotifications] = useState(user.allowNotifications)

  const handleEditUser = async (event) => {


    event.preventDefault()
    setNameErrorMessage(null)
    setUsernameErrorMessage(null)
    setEmailErrorMessage(null)
    if (name.length < 3) {
      setNameErrorMessage('Nimessä pitää olla vähintään 3 kirjainta')
    }
    if (username.length < 3) {
      setUsernameErrorMessage('Käyttäjätunnuksessa pitää olla vähintään 3 kirjainta')
    }
    if (email.length < 5) {
      setEmailErrorMessage('Sähköpostissa pitää olla vähintään 5 kirjainta')
    }
    if (name.length < 3 || username.length < 3) {
      return
    }
    try {
      const editedUser = await userService.editUser({
        name, username, email, allowNotifications
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
          <label>Nimi</label><br />
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
          <label>Käyttäjätunnus</label><br />
          <input
            className="username"
            type="text"
            value={username}
            name="Username"
            placeholder="Käyttäjätunnus"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <Notification message={emailErrorMessage} type="error" />
          <label>Sähköposti</label><br />
          <input
            className="email"
            type="text"
            value={email}
            name="Email"
            placeholder="Sähköposti"
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
          <label>
            Vastaanota ilmoituksia:
            <div className="admin-radio" onChange={({ target }) => setAllowNotifications(target.value)}>
              <label>
                <input
                  type="radio"
                  name="notifications"
                  value={true}
                  defaultChecked={allowNotifications}
                />
                Kyllä
              </label>
              <label>
                <input
                  type="radio"
                  name="notifications"
                  value={false}
                  defaultChecked={!allowNotifications}
                />
                Ei
              </label>
            </div>
          </label>
        </div>
        <button type="submit" className="edit-button">Tallenna</button>
        <button onClick={() => setShowEdit(false)} className="cancel-button">Peruuta</button>
      </form>
    </div>
  )
}

export default EditUser
