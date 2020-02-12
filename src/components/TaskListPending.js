import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import taskService from '../services/task'


const TaskListPending = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    taskService.getPendingTasks().then((response) => {
      setTasks(response)
    })
  }, [])


  return (
    <div className="task-list">
      <h1>Hyväksyttävät kisatehtävät</h1>


      {tasks.map((task) => (
        <div className={`task-list-item ${task.ageGroup.name.toLowerCase()}`} key={task.id}>

          <Link to={`/tehtava/${task.id}`}>
            {task.name}

          </Link>


          <span className="task-list-agegroup">{task.ageGroup.name}</span>

          <span className="task-list-category">{task.category.category}</span>

          <button className="modify-view-button">Muokkaa</button>
          <button className="deleteButton">Poista tehtävä</button>

        </div>
      ))}


    </div>

  )
}

export default TaskListPending
