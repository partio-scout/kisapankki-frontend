import React, { useState, useEffect } from 'react'
import taskService from '../services/task'

const Task = ({ task }) => {
  const [task, setTask] = useState()

  useEffect(() => {
    taskService.getOneTask(task.id).then(response => {
      setTask(response)
    })
  })




  return (
    <div>
      {task.name}
      {task.id}
      
    </div>

  )
}


export default Task