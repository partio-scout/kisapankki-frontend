import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import taskService from '../services/task'
import Notification from './Notification'

const FrontPage = () => {
  const [newTasks, setNewTasks] = useState([])
  const [favoriteTasks, setFavoriteTasks] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    taskService.getTasks().then((response) => {
      setNewTasks(response)
      setFavoriteTasks(response)
    })
  }, [])

  return (
    <div className="task-list frontpage-container">
      <h1>Kisatehtäväpankki</h1>

      <Notification message={errorMessage} />

      <div className="new-favorite-lists">
        <div className="new-list">
          <h2>Uusimmat tehtävät</h2>
          {newTasks && newTasks.length > 0 &&
            <div className="task-list-title frontpage-item">
              <span>Tehtävän nimi</span>
              <span>Sarja</span>
              <span>Kategoria</span>
            </div>
          }
          {newTasks && newTasks.map((task) => (
            <div className="task-list-item frontpage-item" key={task.id}>
              <span>
                <Link to={`/tehtava/${task.id}`}>
                  {task.name}
                </Link>
              </span>
              <span>{task.series.map(s => <div key={task.id + s.id}>{s.name} </div>)}</span>
              <span>{task.category && task.category.name}</span>
            </div>
          ))}
        </div>

        <div className="favorite-list">
          <h2>Suosituimmat tehtävät</h2>
          {favoriteTasks && favoriteTasks.length > 0 &&
            <div className="task-list-title frontpage-item">
              <span>Tehtävän nimi</span>
              <span>Sarja</span>
              <span>Kategoria</span>
            </div>
          }
          {favoriteTasks && favoriteTasks.map((task) => (
            <div className="task-list-item frontpage-item" key={task.id}>
              <span>
                <Link to={`/tehtava/${task.id}`}>
                  {task.name}
                </Link>
              </span>
              <span>{task.series.map(s => <div key={task.id + s.id}>{s.name} </div>)}</span>
              <span>{task.category && task.category.name}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default FrontPage
