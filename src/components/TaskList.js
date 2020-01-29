import React, { useState, useEffect } from 'react'
import taskService from '../services/task'

const TaskList = () => {

  const [tasks, setTasks] = useState([])
 
  useEffect(() => {
  
  
    taskService.getTasks().then(response => {
      setTasks(response)
        
      })
  }, [])




  return (
    <div className="task-list">
      <h2>Tehtävät</h2>
      {tasks.map(task => <ul key={task.id}>{task.name}</ul>)}
   
    </div>
  )
}

export default TaskList