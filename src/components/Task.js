import React, { useState, useEffect } from 'react'
import taskService from '../services/task'

const Task = (taskId) => {
  const [task, setTask] = useState(null)
  

  useEffect(() => {
    taskService.getOneTask(taskId).then(response => {
      setTask(response)
    })
  }, [])


  return (
    <div>
      {task &&
        <div>
          <div>{task.name}</div>
          <div>{task.assignmentText}</div>
          <div>{task.supervisorInstructions}</div>
          <div>{task.gradingScale}</div>
          <div>{task.creatorName}</div>
          <div>{task.creatorEmail}</div>
          <div>{task.ageGroup.name}</div>
          <div>{task.category.category}</div>
          <div>{task.language.language}</div>
          <div>{task.rules.rules}</div>
        

        </div>

      }
    </div>

  )
}


export default Task