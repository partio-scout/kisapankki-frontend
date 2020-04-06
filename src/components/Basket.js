import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import Notification from './Notification'
import taskService from '../services/task'

const Basket = ({ tasks, removeTaskFromBasket, handleUpdateViews, removeAllFromBasket }) => {

  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [place, setPlace] = useState('')
  const [type, setType] = useState('')
  const [logo, setLogo] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const onDrop = (logo) => {
    setLogo(logo)
  }

  const handleDeleteFile = (e) => {
    e.stopPropagation()
    setLogo(null)
  }

  const handleMakePDFs = async (e) => {
    let formData = new FormData()

    const competition = JSON.stringify({ name, date, place, type, tasks })
    formData.append('competition', competition )

    if (logo) {
      formData.append('logo', logo[0], logo[0].name)
    }
    
    try {
      const PDFs = await taskService.makePDFs({ name, date, place, type, logo, tasks })
      setName('')
      setDate('')
      setPlace('')
      setType('')
      setLogo(null)
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
      <h2 className="basket-title">Kisan tiedot</h2>

      <div className="competition">
        <input
          className="competition-name"
          type="text"
          value={name}
          name="Name"
          placeholder="Kisan nimi"
          onChange={({ target }) => setName(target.value)}
        />

        <input
          className="competition-date"
          type="text"
          value={date}
          name="Name"
          placeholder="Kisan päivämäärä"
          onChange={({ target }) => setDate(target.value)}
        />

        <input
          className="competition-place"
          type="text"
          value={place}
          name="Name"
          placeholder="Kisapaikka"
          onChange={({ target }) => setPlace(target.value)}
        />

        <input
          className="competition-type"
          type="text"
          value={type}
          name="Name"
          placeholder="Kisan laji"
          onChange={({ target }) => setType(target.value)}
        />
      </div>

      <Dropzone onDrop={onDrop} maxFiles={1}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="files">
              <div className="title">Logo</div>
              {logo && <div key={logo[0].name}>{logo[0].name}<span onClick={(e) => handleDeleteFile(e)} className="remove-file" /></div>}
            </div>
          </div>
        )}
      </Dropzone>

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
            <Link to={`/tehtava/${task.id}`} onClick={() => handleUpdateViews(task.id)}>
              {task.name}
            </Link>
            <p>Katselukertoja: {task.views}</p>
          </span>
          <span>{task.series.map(s => <div key={task.id + s.id}>{s.name} </div>)}</span>
          <span>{task.category && task.category.name}</span>
          <span>
            {task.files && task.files.map((file) => (
                <div key={file}>
                  <a href={`https://kisapankki.blob.core.windows.net/files/${file}`}>
                    {file.substring(file.indexOf('-') + 1, file.length)}
                  </a>
                </div>
              ))}
          </span>
          <span className="delete-task-from-basket" onClick={() => removeTaskFromBasket(task.id)} />
        </div>
      ))}
      <div className="make-pdfs"><button onClick={handleMakePDFs}>Tee PDF-tiedostot</button></div>
    </div>

  )
}

export default Basket
