import React, { useState, useEffect } from 'react'
import taskService from '../services/task'
import ModifyTask from './ModifyTask'

const Task = (taskId) => {
  const [task, setTask] = useState(null)
  const [modifyVisible, setModifyVisible] = useState(false)

  useEffect(() => {
    taskService.getOneTask(taskId).then(response => {
      setTask(response)
    })
  }, [])

  return (
    <div>
      {modifyVisible ?
        <ModifyTask setModifyVisible={setModifyVisible} task={task} />
        :
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
          <button onClick={() => setModifyVisible(true)}>Muokkaa tehtävää</button>
        </div>

      }
    </div>

  )
}


export default Task