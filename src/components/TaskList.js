import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import taskService from '../services/task'
import Notification from './Notification'


const TaskList = (user) => {
  const [tasks, setTasks] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    taskService.getTasks().then((response) => {
      setTasks(response)
    })
  }, [])

  const handleDelete = (task) => {
    try {
      taskService.deleteTask(task.id)
      setTasks(tasks.filter(t => t.id !== task.id))
    } catch {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleModify = (task) => {

  }


  return (
    <div className="task-list">
      <h1>Kisatehtäväpankki</h1>
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

          {user !== null
            && (
              <>
                <button className="modify-view-button">Muokkaa</button>
                <button className="deleteButton" onClick={() => handleDelete(task)}>Poista tehtävä</button>
              </>
            )}
        </div>
      ))}


    </div>

  )
}

export default TaskList
