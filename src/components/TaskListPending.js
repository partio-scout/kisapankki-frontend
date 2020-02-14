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

  const handleAccept = (id) => {
    try {
    taskService.acceptTask(id)
  } catch {

  }

  return (
    <div className="task-list">
      <h1>Hyväksyntää odottavat kisatehtävät</h1>


      {tasks.map((task) => (
        <div className={`task-list-item ${task.ageGroup.name.toLowerCase()}`} key={task.id}>
          <span>
            <Link to={`/tehtava/${task.id}`}>
              {task.name}

            </Link>
          </span>
          <span>{task.ageGroup.name}</span>
          <span>{task.category.category}</span>

          <button className="modify-view-button" onClick={() => handleAccept(task.id)}>Hyväksy</button>
          <button className="modify-view-button">Muokkaa</button>
          <button className="deleteButton">Poista tehtävä</button>


        </div>
      ))}


    </div>

  )
}

export default TaskListPending
