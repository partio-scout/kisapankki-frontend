import React, { useState, useEffect, Fragment } from 'react'
import Login from './components/Login'
import SignUp from './components/SignUp'
import AddTask from './components/AddTask'

const App = () => {

  const [ user, setUser ] = useState(null)
  const [ showLogin, setShowLogin ] = useState(false)
  const [ showSignUp, setShowSignUp ] = useState(false)
  const [ showAddTask, setShowAddTask ] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const addTaskForm = () => {
    setShowAddTask(!showAddTask)
    setShowLogin(false)
    setShowSignUp(false)
  }

  const loginForm = () => {
    setShowLogin(!showLogin)
    setShowSignUp(false)
    setShowAddTask(false)
  }

  const signUpForm = () => {
    setShowSignUp(!showSignUp)
    setShowLogin(false)
    setShowAddTask(false)
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <div>
      <div className="header">
        <div className="logo"></div>
        {user === null ?
          <Fragment>
            <button className="addtask-button-header" onClick={() => addTaskForm()}>Lisää tehtävä</button>
            <button className="login-button-header" onClick={() => loginForm()}>Kirjaudu</button>
            <button className="signup-button-header" onClick={() => signUpForm()}>Rekisteröidy</button>
          </Fragment>
          :
          <div>
            <div className="logged">Kirjautuneena {user.username}</div>
            <div className="logout"><button className="logout-button-header" onClick={() => logout()}>Kirjaudu ulos</button></div>
          </div>
        }
      </div>
      <div className="container">
        <h1>Kisatehtäväpankki</h1>
        {showAddTask && <AddTask setShowAddTask={setShowAddTask}/> }
        {showLogin && <Login setUser={setUser} setShowLogin={setShowLogin} />}
        {showSignUp && <SignUp setUser={setUser} setShowSignUp={setShowSignUp} />}
      </div>
    </div>
  )
}

export default App
