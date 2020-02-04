import React, { useState, useEffect, Fragment } from 'react'
import Login from './components/Login'
import SignUp from './components/SignUp'
import TaskList from './components/TaskList'
import AddTask from './components/AddTask'
import Admin from './components/Admin'
import tokenService from './services/token'

const App = () => {
  const [page, setPage] = useState('tasks')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      tokenService.setToken(user.token)
    }
  }, [])

  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const content = () => {
    if (page === 'tasks') {
      return <TaskList />
    } if (page === 'login') {
      return <Login setUser={setUser} setPage={setPage} />
    } if (page === 'signup') {
      return <SignUp setPage={setPage} />
    } if (page === 'addtask') {
      return <AddTask />
    } if (user && page === 'admin') {
      return <Admin />
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    tokenService.setToken(null)
    toPage('tasks')
  }

  return (
    <div>
      <div className="header">
        <div className="logo" onClick={toPage('tasks')} />
        <button className="addtask-button-header" onClick={toPage('addtask')}>Lisää tehtävä</button>
        {user === null ?
          <Fragment>
            <button className="login-button-header" onClick={toPage('login')}>Kirjaudu</button>
            <button className="signup-button-header" onClick={toPage('signup')}>Rekisteröidy</button>
          </Fragment>
          :
          <Fragment>
            <button className="admin-button-header" onClick={toPage('admin')}>Admin</button>
            <div>
              <div className="logged">Kirjautuneena {user.username}</div>
              <div className="logout"><button className="logout-button-header" onClick={() => logout()}>Kirjaudu ulos</button></div>
            </div>
          </Fragment>
        }
      </div>
      <div className="admin-task-buttons-mobile">
        {user !== null && <button className="admin-button-mobile" onClick={toPage('admin')}>Admin</button>}
        <button className="addtask-button-mobile" onClick={toPage('addtask')}>Lisää tehtävä</button>
      </div>
      <div className="container">
        <h1>Kisatehtäväpankki</h1>
        {content()}
      </div>
    </div>
  )
}

export default App
