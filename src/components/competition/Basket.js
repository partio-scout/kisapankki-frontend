import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Notification from '../misc/Notification'
import Competition from './Competition'
import taskService from '../../services/task'

const Basket = ({ tasks, removeTaskFromBasket, handleUpdateTask, removeAllFromBasket }) => {

  const handleUpdateViews = async (task) => {
    try {
      await taskService.updateViews(task.id)
      handleUpdateTask({ ...task, views: task.views + 1 })
    } catch (exeption) {
    }
  }

  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [place, setPlace] = useState('')
  const [type, setType] = useState('')
  const [logo, setLogo] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [showLoader, setShowLoader] = useState(false)

  const handleMakePDFs = async (e) => {
    setShowLoader(true)
    let formData = new FormData()

    const competition = JSON.stringify({ name, date, place, type, tasks: tasks.map(t => t.id) })
    formData.append('competition', competition)

    if (logo) {
      formData.append('logo', logo, logo.name)
    }

    try {
      const PDFs = await taskService.makePDFs(formData)
      setName('')
      setDate('')
      setPlace('')
      setType('')
      setLogo(null)
      const url = window.URL.createObjectURL(new Blob([PDFs], {
        type: 'application/zip'
      }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'Rastit.zip')
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
    <div className="task-list">
      <Notification message={errorMessage} type="error" />

      {tasks && tasks.length > 0 &&
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
      }

      <h2 className="basket-title">Kisaan valitut tehtävät</h2>

      {tasks && tasks.length > 0 && <button className="basket-delete-all" onClick={removeAllFromBasket}>Poista kaikki</button>}

      {tasks && tasks.length === 0 && <div className="empty-basket">Ei valittuja tehtäviä</div>}

      {tasks && tasks.length > 0 &&
        <div className="task-list-title">
          <span>Tehtävän nimi</span>
          <span>Sarja</span>
          <span>Kategoria</span>
          <span>Liitetiedostot</span>
          <span></span>
        </div>
      }

      {tasks.map((task) => (
        <div className="task-list-item" key={task.id}>
          <div className="delete-task-from-basket-mobile" onClick={() => removeTaskFromBasket(task.id)} />
          <span>
            <Link to={`/tehtava/${task.id}`} onClick={() => handleUpdateViews(task)}>
              {task.name}
            </Link>
            <p>Katselukertoja: {task.views}</p>
          </span>
          <span>{task.series.map(s => <div key={task.id + s.id}>{s.name} </div>)}</span>
          <span>{task.category && task.category.name}</span>
          <span>
            {task.files && task.files.map((file) => (
              <div key={file}>
                <a href={`https://kisapankkifiles.blob.core.windows.net/files/${file}`}>
                  {file.substring(file.indexOf('-') + 1, file.length)}
                </a>
              </div>
            ))}
          </span>
          <span className="delete-task-from-basket" onClick={() => removeTaskFromBasket(task.id)} />
        </div>
      ))}
      {tasks && tasks.length > 0 && <div className="make-pdfs">
        {showLoader ?
          <div className="loader in-basket"></div>
          :
          <button onClick={handleMakePDFs}>Tee PDF-tiedostot</button>
        }
      </div>}
    </div>
  )
}

export default Basket
