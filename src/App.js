import React, { useState } from 'react'
import Login from './components/Login'
import SignUp from './components/SignUp'

const App = () => {

  const [ showLogin, setShowLogin ] = useState(false)
  const [ showSignUp, setShowSignUp ] = useState(false)

  const setLogin = () => {
    setShowLogin(!showLogin)
    setShowSignUp(false)
  }

  const setSignUp = () => {
    setShowSignUp(!showSignUp)
    setShowLogin(false)
  }

  return (
    <div>
      <div className="header">
        <div className="logo"></div>
        <button className="login-button-header" onClick={() => setLogin()}>Kirjaudu</button>
        <button className="signup-button-header" onClick={() => setSignUp()}>Rekisteröidy</button>
      </div>
      <div className="container">
        <h1>Kisatehtäväpankki</h1>
        {showLogin && <Login />}
        {showSignUp && <SignUp />}
      </div>
    </div>
  )
}

export default App 
