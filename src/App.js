import React, { useState, useEffect, Fragment } from 'react'
import Login from './components/Login'
import SignUp from './components/SignUp'
import AddTask from './components/AddTask'
import Admin from './components/Admin'

const App = () => {
  const [page, setPage] = useState('tasks')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])


  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const content = () => {
    if (page === 'tasks') {
      return <div />
    } if (page === 'login') {
      return <Login setUser={setUser} setPage={setPage} />
    } if (page === 'signup') {
      return <SignUp setUser={setUser} setPage={setPage} />
    } if (page === 'addtask') {
      return <AddTask />
    } if (user && page === 'admin') {
      return <Admin />
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    toPage('tasks')
  }

  return (
    <div>
      <div className="header">
        <div className="logo" onClick={toPage('tasks')} />
        {user === null
          ? (
            <>
              <button className="addtask-button-header" onClick={toPage('addtask')}>Lisää tehtävä</button>
              <button className="login-button-header" onClick={toPage('login')}>Kirjaudu</button>
              <button className="signup-button-header" onClick={toPage('signup')}>Rekisteröidy</button>
            </>
          )
          : (
            <>
              <button className="admin-button" onClick={toPage('admin')}>Admin</button>
              <button className="addtask-button-header" onClick={toPage('addtask')}>Lisää tehtävä</button>
              <div>
                <div className="logged">
Kirjautuneena
                  {user.username}
                </div>
                <div className="logout"><button className="logout-button-header" onClick={() => logout()}>Kirjaudu ulos</button></div>
              </div>
            </>
          )}
      </div>
      <div className="container">
        <h1>Kisatehtäväpankki</h1>
        {content()}
      </div>
    </div>
  )
}

export default App
