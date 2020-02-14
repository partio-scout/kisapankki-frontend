import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import taskService from '../services/task'
import Notification from './Notification'


const TaskListPending = () => {
  const [tasks, setTasks] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
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

  const handleDelete = async (task) => {
    try {
      await taskService.deleteTask(task.id)
      setTasks(tasks.filter(t => t.id !== task.id))
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

      {tasks.map((task) => (
        <div className={`task-list-item ${task.ageGroup.name.toLowerCase()}`} key={task.id}>
          <span>
            <Link to={`/tehtava/${task.id}`}>
              {task.name}
          
            </Link>
          </span>
          <span>{task.ageGroup.name}</span>
          <span>{task.category.category}</span>

          <button className="task-list-button" onClick={() => handleAccept(task.id)}>Hyväksy</button>
          <button className="deleteButton" onClick={() => handleDelete(task)}>Poista tehtävä</button>


        </div>
      ))}


    </div>

  )
}

export default TaskListPending
