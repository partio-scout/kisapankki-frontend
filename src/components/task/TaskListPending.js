import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import taskService from '../../services/task'
import Notification from '../misc/Notification'
import tokenService from '../../services/token'


const TaskListPending = ({ handleAddTask, handleUpdateTask, handleDeleteTask }) => {
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

  const handleAccept = (e, task) => {
    e.preventDefault()
    try {
      taskService.acceptTask(task.id)
      setTasks(tasks.filter(t => t.id !== task.id))
      handleAddTask(task)
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

  const handleUpdateViews = async (task) => {
    try {
      await taskService.updateViews(task.id)
      handleUpdateTask({ ...task, views: task.views + 1 })
    } catch (exeption) {
    }
  }

  const handleDelete = async (e, task) => {
    e.preventDefault()
    try {
      if (window.confirm(`Haluatko poistaa tehtävän: ${task.name}`)) {
        await taskService.deleteTask(task.id)
        handleDeleteTask(task.id)
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
          <span></span>
        </div>
      }
      
      {tasks.map((task) => (
        <Link className="no-underline" to={`/tehtava/${task.id}`} onClick={() => handleUpdateViews(task)} key={task.id}>
        <div className="task-list-item">
          <span>
            {task.name}
            <p>Katselukertoja: {task.views}</p>
          </span>
          <span>{task.series.map(s => <div key={task.id + s.id}>{s.name} </div>)}</span>
          <span>{task.category && task.category.name}</span>
          <span><button className="accept-button" onClick={(e) => handleAccept(e, task)}>Hyväksy</button></span>
          <span><button className="delete-button" onClick={(e) => handleDelete(e, task)}>Poista</button></span>
          <span></span>
        </div>
      </Link>
      ))}

    </div>

  )
}

export default TaskListPending
