import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import taskService from '../services/task'
import tokenService from '../services/token'



const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    taskService.getTasks().then((response) => {
      setTasks(response)
    })

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      tokenService.setToken(user.token)
    }
  }, [])

  const handleDelete = (task) => {
    try {
      taskService.deleteTask(task.id)
    } catch {
    }
  }



  return (
    <div className="task-list">
      <h1>Kisatehtäväpankki</h1>


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
