import React from 'react'
import { Link } from 'react-router-dom'
import taskService from '../services/task'
import Notification from './Notification'

const Basket = ({ tasks, removeTaskFromBasket }) => {

  return (
    <div className="task-list">
      <h2>Kisaan valitut tehtävät</h2>

      {tasks && tasks.length === 0 && <div>Ei valittuja tehtäviä</div>}

      {tasks && tasks.length > 0 &&
        <div className="task-list-title">
          <span>Tehtävän nimi</span>
          <span>Sarja</span>
          <span>Kategoria</span>
          <span></span>
        </div>
      }
      {tasks.map((task) => (
        <div className="task-list-item" key={task.id}>
          <span>
            <Link to={`/tehtava/${task.id}`} onClick={() => taskService.updateViews(task.id)}>
              {task.name}
            </Link>
            <p>Katselukertoja: {task.views}</p>
          </span>
          <span>{task.series.map(s => <div key={task.id + s.id}>{s.name} </div>)}</span>
          <span>{task.category && task.category.name}</span>
          <span className="delete-task-from-basket" onClick={() => removeTaskFromBasket(task.id)}>x</span>
        </div>
      ))}
    </div>

  )
}

export default Basket
