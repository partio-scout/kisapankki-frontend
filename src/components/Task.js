import React, { useState, useEffect } from 'react'
import taskService from '../services/task'
import ModifyTask from './ModifyTask'
import Notification from './Notification'

const Task = (taskId) => {
  const [task, setTask] = useState(null)
  const [modifyVisible, setModifyVisible] = useState(false)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    taskService.getOneTask(taskId).then(response => {
      setTask(response)
    })
  }, [])

  const handleDelete = () => {
    try {
      taskService.deleteTask(task.id)
      setMessage('Tehtävä poistettu')
      setTimeout(() => {
        setMessage(null)
        window.history.back()
      }, 5000)
    } catch {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {modifyVisible ?
        <ModifyTask setModifyVisible={setModifyVisible} task={task} />
        :
        <div>
          <Notification message={message} type="success" />
          <Notification message={errorMessage} type="error" />
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
          <button onClick={() => setModifyVisible(true)} className="modify-view-button">Muokkaa tehtävää</button>
          <button className="deleteButton" onClick={() => handleDelete()}>Poista tehtävä</button>
        </div>

      }
    </div>

  )
}


export default Task