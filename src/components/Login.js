import React, { useState } from 'react'
import Notification from './Notification'
import loginService from '../services/login'
import tokenService from '../services/token'

const Login = ({ setUser, setPage }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user),
      )
      setUser(user)
      tokenService.setToken(user.token)
      setUsername('')
      setPassword('')
      setPage('tasks')
    } catch (exception) {
      setErrorMessage('Väärä käyttäjätunnus/salasana')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="login-form">
      <h2>Kirjaudu sisään</h2>
      <Notification message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
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
          <input
            className="password"
            type="password"
            value={password}
            name="Password"
            placeholder="Salasana"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" className="login-button">Kirjaudu</button>
      </form>
    </div>
  )
}

export default Login
