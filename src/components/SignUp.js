import React, { useState } from 'react'
import Notification from './Notification' 
import signupService from '../services/signup' 

const SignUp = () => {

  const [errorMessage, setErrorMessage] = useState(null)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [key, setKey] = useState('')
  const [user, setUser] = useState(null)

  const handleSignUp = async (event) => {
    event.preventDefault()
    try {
      const user = await signupService.signup({
        name, username, password, key
      })

      setUser(user)
      setName('')
      setUsername('')
      setPassword('')
      setKey('')
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
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