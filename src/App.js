import React, { useState, useEffect, Fragment } from 'react'
import { Route, Link, Redirect, useHistory } from 'react-router-dom'
import Login from './components/Login'
import FrontPage from './components/FrontPage'
import TaskList from './components/TaskList'
import Basket from './components/Basket'
import AddAdmin from './components/AddAdmin'
import AddTaskDropdown from './components/AddTaskDropdown'
import AddTask from './components/AddTask'
import Admin from './components/Admin'
import User from './components/User'
import Task from './components/Task'
import tokenService from './services/token'
import taskService from './services/task'

const App = () => {
  const [basket, setBasket] = useState([])
  const [tasks, setTasks] = useState([])
  const [user, setUser] = useState(null)
  const history = useHistory()

  useEffect(() => {
    taskService.getTasks().then((response) => {
      setTasks(response)
    })
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      tokenService.setToken(loggedUser.token)
    }
    const votes = window.localStorage.getItem('votes')
    if (!votes) {
      const votes = []
      window.localStorage.setItem('votes', JSON.stringify(votes))
    }
    const basketJSON = window.localStorage.getItem('basket')

    if (basketJSON) {
      const foundBasket = JSON.parse(basketJSON)
      setBasket(foundBasket)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(
      'basket', JSON.stringify(basket)
    )
  }, [basket])

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    tokenService.setToken(null)
    history.push('/')
    window.location.reload()
  }

  const handleAddTask = (task) => {
    setTasks(tasks.concat(task))
  }

  const handleUpdateTask = (modifiedTask) => {
    setTasks(tasks.map(task => task.id !== modifiedTask.id ? task : modifiedTask))
    setBasket(basket.map(task => task.id !== modifiedTask.id ? task : modifiedTask))
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
    setBasket(basket.filter(t => t.id !== id))
  }

  const addTaskToBasket = (e, task) => {
    e.preventDefault()
    e.stopPropagation()
    const foundTask = basket.find(t => t.id === task.id)
    if (!foundTask) {
      setBasket(basket.concat(task))
    }
  }

  const removeTaskFromBasket = (id) => {
    setBasket(basket.filter(task => task.id !== id))
  }

  const removeAllFromBasket = () => {
    setBasket([])
  }

  return (
    <div>
      <div className="header">
        <Link to="/"><div className="logo" /></Link>
        <Link to="/tehtavat"><button className="addtask-button-header">Tehtävät</button></Link>
        <Link to="/lisaa_tehtava"><button className="addtask-button-header">Lisää tehtävä</button></Link>

        {user === null ?
          <Fragment>
            <Link to="/kirjautuminen"><button className="login-button-header">Kirjaudu</button></Link>
          </Fragment>
          :
          <Fragment>
            <Link to="/admin"><button className="admin-button-header">Admin</button></Link>
            <div>
              <div className="logged">Kirjautuneena <Link to="/omasivu" className="username-header">{user.username}</Link></div>
              <div className="logout"><button className="logout-button-header" onClick={() => logout()}>Kirjaudu ulos</button></div>
            </div>
          </Fragment>
        }
        <Link to="/valitut_tehtavat"><div className="white-basket">{basket.length > 0 && <span className="number-of-tasks-in-basket">{basket.length}</span>}</div></Link>
      </div>
      <div className="admin-task-buttons-mobile">
        <Link to="/tehtavat"><button className="addtask-button-mobile">Tehtävät</button></Link>
        <Link to="/lisaa_tehtava"><button className="addtask-button-mobile">Lisää tehtävä</button></Link>
        {user !== null && <Link to="/admin"><button className="admin-button-mobile">Admin</button></Link>}
      </div>
      <div className="container">
        <Route exact path="/" render={() => <FrontPage tasks={tasks} addTaskToBasket={addTaskToBasket} handleUpdateTask={handleUpdateTask} />} />
        <Route exact path="/tehtava/:id" render={(match) => <Task {...match} user={user} addTaskToBasket={addTaskToBasket} handleAddTask={handleAddTask} handleUpdateTask={handleUpdateTask} handleDeleteTask={handleDeleteTask} />} />
        <Route path="/tehtavat" render={() => <TaskList user={user} originalTasks={tasks} addTaskToBasket={addTaskToBasket} handleUpdateTask={handleUpdateTask} handleDeleteTask={handleDeleteTask} />} />
        <Route path="/valitut_tehtavat" render={() => <Basket tasks={basket} removeTaskFromBasket={removeTaskFromBasket} removeAllFromBasket={removeAllFromBasket} handleUpdateTask={handleUpdateTask} />} />
        <Route path="/kirjautuminen" render={() => <Login setUser={setUser} />} />
        <Route path="/lisaa_tehtava" render={() => <AddTask />} />
        <Route path="/omasivu" render={() => (localStorage.getItem('loggedUser') ? <User user={user} setUser={setUser} /> : <Redirect to="/" />)} />
        <Route path="/admin" render={() => (localStorage.getItem('loggedUser') ? <Admin handleAddTask={handleAddTask} handleUpdateTask={handleUpdateTask} handleDeleteTask={handleDeleteTask} /> : <Redirect to="/" />)} />
        <Route path="/lisaa_admin" render={() => (localStorage.getItem('loggedUser') ? <AddAdmin /> : <Redirect to="/" />)} />
        <Route path="/lisaa_pudotusvalikkoon" render={() => (localStorage.getItem('loggedUser') ? <AddTaskDropdown /> : <Redirect to="/" />)} />
      </div>
    </div>
  )
}

export default App
