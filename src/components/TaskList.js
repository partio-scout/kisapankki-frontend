import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import taskService from '../services/task'
import tokenService from '../services/token'

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [user, setUser] = useState(null)

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


  const handlePending = () => {
    taskService.makePendingFalse()
  }


  return (
    <div className="task-list">
      <h1>Kisatehtäväpankki</h1>


      {tasks.map((task) => (
        <div className={`task-list-item ${task.ageGroup.name.toLowerCase()}`} key={task.id}>

          <Link to={`/tehtava/${task.id}`}>
            {task.name}

          </Link>


          <span className="task-list-agegroup">{task.ageGroup.name}</span>
         
        

          <span className="task-list-category">{task.category.category}</span>
          {user !== null
            && (
              <>
                <button className="modify-view-button">Muokkaa</button>
                <button className="deleteButton">Poista tehtävä</button>
              </>
            )}
        </div>
      ))}


    </div>

  )
}

export default TaskList
