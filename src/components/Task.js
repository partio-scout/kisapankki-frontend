import React, { useState, useEffect } from 'react'
import taskService from '../services/task'
import ModifyTask from './ModifyTask'
import Notification from './Notification'
import tokenService from '../services/token'
import { useHistory } from 'react-router-dom'

const Task = (taskId) => {
  const [task, setTask] = useState(null)
  const [user, setUser] = useState(null)
  const [modifyVisible, setModifyVisible] = useState(false)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const history = useHistory()

  useEffect(() => {
    taskService.getOneTask(taskId).then((response) => {
      setTask(response)
    })

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      tokenService.setToken(user.token)
    }
  }, [])

  const handleDelete = () => {
    try {
      taskService.deleteTask(task.id)
      setMessage('Tehtävä poistettu')
      setTimeout(() => {
        setMessage(null)
        history.push('/')
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
      <br />
      {modifyVisible ?
        <ModifyTask setModifyVisible={setModifyVisible} task={task} setTask={setTask} />
        :
        <div className="task-view-info-background">
          <Notification message={message} type="success" />
          <Notification message={errorMessage} type="error" />
          {task &&
            <div>
              <h2 className="task-view-info">{task.name}</h2>
              <h3 className="task-view-info">Tehtävänanto:</h3>
              <p className="task-view-info">{task.assignmentText}</p>
              <h3 className="task-view-info">Rastimiehen ohjeet:</h3>
              <p className="task-view-info">{task.supervisorInstructions}</p>
              <h3 className="task-view-info">Arvosteluasteikko:</h3>
              <p className="task-view-info">{task.gradingScale}</p>
              <h3 className="task-view-info">Sarja: </h3>
              <p className="task-view-info">{task.ageGroup.name}</p>
              <h3 className="task-view-info">Kategoria:</h3>
              <p className="task-view-info">{task.category.category}</p>
              <h3 className="task-view-info">Sääntöluokka:</h3>
              <p className="task-view-info">{task.rules.rules}</p>
              <h3 className="task-view-info">Tehtävän viimeisin muokkaaja:</h3>
              <p className="task-view-info">{task.creatorName}</p>
              <p className="task-view-info">{task.creatorEmail}</p>
            </div>

          }
          {user !== null &&
            <div>
              <button onClick={() => setModifyVisible(true)} className="modify-view-button">Muokkaa tehtävää</button>
              <button className="deleteButton" onClick={() => handleDelete()}>Poista tehtävä</button>
            </div>}
        </div>

      }
    </div>

  )
}


export default Task
