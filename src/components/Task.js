import React, { useState, useEffect } from 'react'
import taskService from '../services/task'
import Rating from './Rating'
import Comment from './Comment'
import ModifyTask from './ModifyTask'
import Notification from './Notification'
import TaskTextDisplay from './TaskTextDisplay'
import Competition from './Competition'
import Moment from 'react-moment'
import { useHistory } from 'react-router-dom'
import AddComment from './AddComment'

const Task = ({ match, user, rules, seriess, languages, addTaskToBasket, handleAddTask, handleUpdateTask, handleDeleteTask }) => {

  const [task, setTask] = useState(null)
  const [modifyVisible, setModifyVisible] = useState(false)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [place, setPlace] = useState('')
  const [type, setType] = useState('')
  const [logo, setLogo] = useState(null)
  const [showMakePDF, setShowMakePDF] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const history = useHistory()

  useEffect(() => {
    taskService.getOneTask(match.params.id).then((response) => {
      setTask(response)
    })
  }, [])

  const handleDelete = () => {
    try {
      if (window.confirm(`Haluatko poistaa tehtävän: ${task.name}`)) {
        taskService.deleteTask(task.id)
        handleDeleteTask(task.id)
        setMessage('Tehtävä poistettu')
        setTimeout(() => {
          setMessage(null)
          if (task.pending) {
            history.push('/admin')
          } else {
            history.push('/')
          }
        }, 2000)
      }
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleAccept = () => {
    try {
      taskService.acceptTask(task.id)
      setMessage('Tehtävä hyväksytty')
      handleAddTask(task)
      setTimeout(() => {
        setMessage(null)
        history.push('/admin')
      }, 2000)
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleMakePDF = async () => {
    setShowLoader(true)
    let formData = new FormData()

    const competition = JSON.stringify({ name, date, place, type, task: task.id })
    formData.append('competition', competition)

    if (logo) {
      formData.append('logo', logo, logo.name)
    }

    try {
      const PDF = await taskService.makePDF(formData, task.id)
      setName('')
      setDate('')
      setPlace('')
      setType('')
      setLogo(null)
      const url = window.URL.createObjectURL(new Blob([PDF], {
        type: 'application/pdf'
      }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${task.name}.pdf`)
      document.body.appendChild(link)
      link.click()
      setShowLoader(false)
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {modifyVisible ?
        <ModifyTask setModifyVisible={setModifyVisible} task={task} rules={rules} seriess={seriess} languages={languages} setTask={setTask} handleUpdateTask={handleUpdateTask} />
        :

        <div>
          <Notification message={message} type="success" />
          <Notification message={errorMessage} type="error" />
          {task &&
            <div>
              <div className="task-view-info-background">
                <div className="task-view-info">
                  <h2>{task.name}</h2>
                  <span><div className="black-basket-task-view" title="Lisää koriin" onClick={(e) => addTaskToBasket(e, task)} /></span>
                  <Rating task={task} handleUpdateTask={handleUpdateTask} />
                </div>
                <h3>Tehtävänanto</h3>
                <TaskTextDisplay text={task.assignmentText} />
                <h3>Rastimiehen ohjeet</h3>
                <TaskTextDisplay text={task.supervisorInstructions} />
                <h3>Arvosteluasteikko</h3>
                <TaskTextDisplay text={task.gradingScale} />
                <h3>Sarja</h3>
                {task.series.map(s => <span key={task.id + s.id}>{s.name}<br /></span>)}
                <h3>Kategoria</h3>
                <p>{task.category && task.category.name}</p>
                <h3>Sääntöluokka</h3>
                <p>{task.rules && task.rules.name}</p>
                <h3>Tehtävän viimeisin muokkaaja</h3>
                <p>{task.creatorName}<br />{task.creatorEmail}</p>
                <h3>Tehtävä lisätty</h3>
                {task.created && <p><Moment format="DD.MM.YYYY HH:mm">{task.created}</Moment></p>}
                <h3>Liitetiedostot</h3>
                {task.files && task.files.length === 0 && <p>-</p>}
                {task.files && task.files.map((file) => (
                  <div key={file}>
                    <a href={`https://kisapankki.blob.core.windows.net/files/${file}`}>
                      {file.substring(file.indexOf('-') + 1, file.length)}
                    </a>
                  </div>
                ))}

                {showMakePDF ?
                  <div className="competition-task">
                    <div className="make-pdf right" onClick={() => setShowMakePDF(false)}>Sulje</div>
                    <Competition
                      name={name}
                      date={date}
                      place={place}
                      type={type}
                      logo={logo}
                      setName={setName}
                      setDate={setDate}
                      setPlace={setPlace}
                      setType={setType}
                      setLogo={setLogo}
                    />
                    {showLoader ?
                      <div className="loader in-task"></div>
                      :
                      <button onClick={() => handleMakePDF()}>Tee PDF-tiedosto</button>
                    }
                  </div>
                  :
                  <div className="make-pdf" onClick={() => setShowMakePDF(true)}>Lisää kisan tiedot/Tee PDF</div>
                }
                {user &&
                  <div className="buttons">
                    <button onClick={() => setModifyVisible(true)} className="modify-view-button">Muokkaa</button>
                    {task.pending && <button className="accept-button" onClick={() => handleAccept()}>Hyväksy</button>}
                    <button className="delete-button" onClick={() => handleDelete()}>Poista</button>
                  </div>}
              </div>

              <div className="task-view-info-background">
                <h3>Kommentit:</h3>

                <Comment task={task} user={user}/>
                
              </div>
            </div>
          }
        </div>

      }
    </div>

  )
}

export default Task
