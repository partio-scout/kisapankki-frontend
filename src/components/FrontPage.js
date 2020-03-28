import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const FrontPage = ({ tasks, addTaskToBasket }) => {
  const [newTasks, setNewTasks] = useState([])
  const [favoriteTasks, setFavoriteTasks] = useState([])

  useEffect(() => {
    setNewTasks([...tasks].sort(compareCreated).slice(0, 5))
    setFavoriteTasks([...tasks].sort(compareRatings).slice(0, 5))
  }, [tasks])

  const compareCreated = (a, b) => {
    return b.created.localeCompare(a.created)
  }

  const compareRatings = (a, b) => {
    return b.ratingsAVG - a.ratingsAVG
  }

  return (
    <div className="task-list frontpage-container">
      <h1>Kisatehtäväpankki</h1>

      <div className="new-favorite-lists">
        <div className="new-list">
          <h2>Uusimmat tehtävät</h2>
          <div className="task-list-title frontpage-item">
            <span>Tehtävän nimi</span>
            <span>Sarja</span>
            <span>Kategoria</span>
            <span></span>
          </div>
          {newTasks.map((task) => (
            <Link className="no-underline" to={`/tehtava/${task.id}`}>
              <div className="task-list-item frontpage-item new-item" key={task.id}>
                <span>
                  {task.name}
                </span>
                <span>{task.series.map(s => <div key={task.id + s.id}>{s.name} </div>)}</span>
                <span>{task.category && task.category.name}</span>
                <span><div className="black-basket" onClick={() => addTaskToBasket(task)} /></span>
              </div>
            </Link>

          ))}
        </div>

        <div className="favorite-list">
          <h2>Suosituimmat tehtävät</h2>
          <div className="task-list-title frontpage-item">
            <span>Tehtävän nimi</span>
            <span>Sarja</span>
            <span>Kategoria</span>
            <span></span>
          </div>
          {favoriteTasks.map((task) => (
            <Link className="no-underline" to={`/tehtava/${task.id}`}>
              <div className="task-list-item frontpage-item favorite-item" key={task.id}>
                <span>
                  {task.name}
                </span>
                <span>{task.series.map(s => <div key={task.id + s.id}>{s.name} </div>)}</span>
                <span>{task.category && task.category.name}</span>
                <span><div className="black-basket" onClick={() => addTaskToBasket(task)} /></span>
              </div>
            </Link>

          ))}
        </div>

      </div>
    </div>
  )
}

export default FrontPage
