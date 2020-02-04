import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import signupService from '../services/signup'

const AddAdmin = ({ setPage }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [nameErrorMessage, setNameErrorMessage] = useState(null)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState(null)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    signupService.getUsers().then(response => {
      setUsers(response)
    })
  }, [])

  const handleAddAdmin = async (event) => {
    event.preventDefault()
    setNameErrorMessage(null)
    setUsernameErrorMessage(null)
    setPasswordErrorMessage(null)
    if (name.length < 3) {
      setNameErrorMessage('Nimessä pitää olla vähintään 3 kirjainta')
    }
    if (username.length < 3) {
      setUsernameErrorMessage('Käyttäjätunnuksessa pitää olla vähintään 3 kirjainta')
    }
    if (password.length < 3) {
      setPasswordErrorMessage('Salasanassa pitää olla vähintään 3 kirjainta')
    }
    if (users.some(user => (user.username === username))) {
      setUsernameErrorMessage('Käyttäjätunnus on varattu')
    }
    if (name.length < 3 || username.length < 3 || password.length < 3
      || users.some(user => (user.username === username))) {
      return
    }
    try {
      await signupService.signup({
        name, username, password
      })
      setName('')
      setUsername('')
      setPassword('')
      setPage('login')
    } catch (exception) {
      setErrorMessage('Lisääminen epäonnistui')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="signup-form">
      <h2>Lisää ylläpitäjä</h2>
      <Notification message={errorMessage} type="error" />
      <form onSubmit={handleAddAdmin}>
        <div>
          <Notification message={nameErrorMessage} type="error" />
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
          <Notification message={passwordErrorMessage} type="error" />
          <input
            className="password"
            type="password"
            value={password}
            name="Password"
            placeholder="Salasana"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" className="signup-button">Lisää</button>
      </form>
    </div>
  )
}

export default AddAdmin
