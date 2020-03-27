import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import taskService from '../services/task'
import Notification from './Notification'
import tokenService from '../services/token'


const TaskListPending = () => {
  const [tasks, setTasks] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    if (!tokenService.getToken()) {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
        const loggedUser = JSON.parse(loggedUserJSON)
        tokenService.setToken(loggedUser.token)
      }
    }
    taskService.getPendingTasks().then((response) => {
      setTasks(response)
    })
  }, [])

  const handleAccept = (id) => {
    try {
      taskService.acceptTask(id)
      setTasks(tasks.filter(t => t.id !== id))
      setMessage('Tehtävä hyväksytty')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (id) => {
    try {
      if (window.confirm(`Haluatko poistaa tehtävän: ${tasks.find(t => t.id === id).name}`)) {
        await taskService.deleteTask(id)
        setTasks(tasks.filter(t => t.id !== id))
      }
    } catch (exeption) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="task-list">
      <h1>Hyväksyntää odottavat kisatehtävät</h1>
      <Notification message={message} type="success" />
      <Notification message={errorMessage} type="error" />
      {tasks && tasks.length > 0 &&
        <div className="task-list-title">
          <span>Tehtävän nimi</span>
          <span>Sarja</span>
          <span>Kategoria</span>
          <span></span>
          <span></span>
        </div>
      }
      {tasks.map((task) => (
        <div className={`task-list-item pending`} key={task.id}>
          <span>
            <Link to={`/tehtava/${task.id}`}>
              {task.name}
            </Link>
          </span>
          <span>{task.series.map(s => <div key={task.id + s.id}>{s.name} </div>)}</span>
          <span>{task.category && task.category.name}</span>
          <span>
            <button className="accept-button" onClick={() => handleAccept(task.id)}>Hyväksy</button>
            <button className="delete-button" onClick={() => handleDelete(task.id)}>Poista</button>
          </span>
          <span></span>
        </div>
      ))}

    </div>

  )
}

export default TaskListPending
