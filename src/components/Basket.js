import React from 'react'
import { Link } from 'react-router-dom'
import taskService from '../services/task'

const Basket = ({ tasks, removeTaskFromBasket, handleUpdateTask, removeAllFromBasket }) => {

  const handleUpdateViews = async (task) => {
    try {
      await taskService.updateViews(task.id)
      handleUpdateTask({ ...task, views: task.views + 1 })
    } catch (exeption) {
    }
  }

  return (
    <div className="task-list">
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
                  <a href={`https://kisapankki.blob.core.windows.net/files/${file}`}>
                    {file.substring(file.indexOf('-') + 1, file.length)}
                  </a>
                </div>
              ))}
          </span>
          <span className="delete-task-from-basket" onClick={() => removeTaskFromBasket(task.id)} />
        </div>
      ))}
    </div>

  )
}

export default Basket
