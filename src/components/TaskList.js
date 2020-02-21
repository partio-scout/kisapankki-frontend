import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import taskService from '../services/task'
import Notification from './Notification'
import Search from './SearchTasks'

const TaskList = ({user}) => {
  const [tasks, setTasks] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    taskService.getTasks().then((response) => {
      setTasks(response)
    })
  }, [])

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
      <h1>Kisatehtäväpankki</h1>
      <Search setTasks={setTasks} />
      <Notification message={errorMessage} />
      {tasks.map((task) => (
        <div className="task-list-item" key={task.id}>
          <span>
            <Link to={`/tehtava/${task.id}`}>
              {task.name}
            </Link>
          </span>
          <span>{task.ageGroup.name}</span>
          <span>{task.category.category}</span>

          {user !== null &&
              <span><button className="delete-button" onClick={() => handleDelete(task)}>Poista</button></span>
          }
        </div>
      ))}
    </div>

  )
}

export default TaskList
