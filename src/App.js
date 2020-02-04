import React, { useState, useEffect, Fragment } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import Login from './components/Login'
import AddAdmin from './components/AddAdmin'
import AddTask from './components/AddTask'
import Admin from './components/Admin'
import tokenService from './services/token'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      tokenService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    tokenService.setToken(null)
  }

  return (
    <div>
      <div className="header">
        <Link to="/"><div className="logo" /></Link>
        <Link to="/lisaa_tehtava"><button className="addtask-button-header">Lisää tehtävä</button></Link>

        {user === null ?
          <Fragment>
            <Link to="/kirjautuminen"><button className="login-button-header">Kirjaudu</button></Link>
          </Fragment>
          :
          <Fragment>
            <Link to="/admin"><button className="admin-button-header">Admin</button></Link>
            <div>
              <div className="logged">Kirjautuneena {user.username}</div>
              <div className="logout"><button className="logout-button-header" onClick={() => logout()}>Kirjaudu ulos</button></div>
            </div>
          </Fragment>
        }
      </div>
      <div className="admin-task-buttons-mobile">
        {user !== null && <Link to="/admin"><button className="admin-button-mobile">Admin</button></Link>}
        <Link to="/lisaa_tehtava"><button className="addtask-button-mobile">Lisää tehtävä</button></Link>
      </div>
      <div className="container">
        <h1>Kisatehtäväpankki</h1>
          <Route exact path="/" render={() => <div />} />
          <Route path="/kirjautuminen" render={() => <Login setUser={setUser} />} />
          <Route path="/rekisteroityminen" render={() => <AddAdmin />} />
          <Route path="/lisaa_tehtava" render={() => <AddTask />} />
          <Route path="/admin" render={() => user ? <Admin /> : <Redirect to="/" />} />
        </div>
    </div>
  )
}

export default App
