import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import taskService from '../services/task'


const TaskList = (user) => {
  const [tasks, setTasks] = useState([])


  useEffect(() => {
    taskService.getTasks().then((response) => {
      setTasks(response)
    })
  }, [])


  return (
    <div className="task-list">
      <h1>Kisatehtäväpankki</h1>


      {tasks.map((task) => (
        <div className={`task-list-item ${task.ageGroup.name.toLowerCase()}`} key={task.id}>


          <span>{task.name}</span>

          <span className="task-list-agegroup">{task.ageGroup.name}</span>

          <span className="task-list-category">{task.category.category}</span>
          {user
            && (
              <>
                <button>Hyväksy</button>
                <button>Muokkaa</button>
                <button>Poista</button>
              </>
            )}
        </div>
      ))}



    </div>

  )
}

export default TaskList
