import React, { useState } from 'react'
import Notification from './Notification'
import signupService from '../services/signup'

const SignUp = ({ setUser, setPage }) => {

  const [errorMessage, setErrorMessage] = useState(null)
  const [nameErrorMessage, setNameErrorMessage] = useState(null)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState(null)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [key, setKey] = useState('')

  const handleSignUp = async (event) => {
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
    if (name.length < 3 || username.length < 3 || password.length < 3) {
      return
    }
    try {
      const user = await signupService.signup({
        name, username, password, key,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      setName('')
      setUsername('')
      setPassword('')
      setKey('')
      setPage('tasks')
    } catch (exception) {
      setErrorMessage('Rekisteröityminen epäonnistui')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="signup-form">
      <h2>Rekisteröidy</h2>
      <Notification message={errorMessage} />
      <form onSubmit={handleSignUp}>
        <div>
          <Notification message={nameErrorMessage} />
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
          <Notification message={usernameErrorMessage} />
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
          <Notification message={passwordErrorMessage} />
          <input
            className="password"
            type="password"
            value={password}
            name="Password"
            placeholder="Salasana"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <input
            className="key"
            type="text"
            value={key}
            name="Key"
            placeholder="Avain"
            onChange={({ target }) => setKey(target.value)}
          />
        </div>
        <button type="submit" className="signup-button">Rekisteröidy</button>
      </form>
    </div>
  )
}

export default SignUp
