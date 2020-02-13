import React, { useState, useEffect } from 'react'
import taskService from '../services/task'
import ModifyTask from './ModifyTask'
import Notification from './Notification'
import { useHistory } from 'react-router-dom'

const Task = ({ match, user }) => {
  const [task, setTask] = useState(null)
  const [modifyVisible, setModifyVisible] = useState(false)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const history = useHistory()

  useEffect(() => {
    taskService.getOneTask(match.params.id).then((response) => {
      setTask(response)
    })
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
              <div className="task-view-info">
                <h2>{task.name}</h2>
                <h3>Tehtävänanto:</h3>
                <p>{task.assignmentText}</p>
                <h3>Rastimiehen ohjeet:</h3>
                <p>{task.supervisorInstructions}</p>
                <h3>Arvosteluasteikko:</h3>
                <p>{task.gradingScale}</p>
                <h3>Sarja: </h3>
                <p>{task.ageGroup.name}</p>
                <h3>Kategoria:</h3>
                <p>{task.category.category}</p>
                <h3>Sääntöluokka:</h3>
                <p>{task.rules.rules}</p>
                <h3>Tehtävän viimeisin muokkaaja:</h3>
                <p>{task.creatorName}</p>
                <p>{task.creatorEmail}</p>
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
