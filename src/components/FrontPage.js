import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FrontPageInfo from './FrontPageInfo'

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
    <div className="frontpage">
      <h1>Tervetuloa Kisatehtäväpankkiin!</h1>
      <div className="task-list frontpage-container">
        <FrontPageInfo />
        <div className="new-favorite-lists">
          <div className="new-list">
            <div className="image-on-background">
              <h2>Uusimmat tehtävät</h2>
              <div className="task-list-title frontpage-item">
                <span >Tehtävän nimi</span>
                <span>Sarja</span>
                <span>Kategoria</span>
                <span></span>
              </div>
            </div>
            {newTasks.map((task) => (
              <div className="task-list-item frontpage-item new-item" key={task.id}>
                <span>
                  <Link to={`/tehtava/${task.id}`}>
                    {task.name}
                  </Link>
                </span>
                <span>{task.series.map(s => <div key={task.id + s.id}>{s.name} </div>)}</span>
                <span>{task.category && task.category.name}</span>
                <span><div className="black-basket" onClick={() => addTaskToBasket(task)} /></span>
              </div>
            ))}
          </div>

          <div className="favorite-list">
            <div className="image-on-background">
              <h2>Suosituimmat tehtävät</h2>
              <div className="task-list-title frontpage-item">
                <span>Tehtävän nimi</span>
                <span>Sarja</span>
                <span>Kategoria</span>
                <span></span>
              </div>
            </div>
            {favoriteTasks.map((task) => (
              <div className="task-list-item frontpage-item favorite-item" key={task.id}>
                <span>
                  <Link to={`/tehtava/${task.id}`}>
                    {task.name}
                  </Link>
                </span>
                <span>{task.series.map(s => <div key={task.id + s.id}>{s.name} </div>)}</span>
                <span>{task.category && task.category.name}</span>
                <span><div className="black-basket" onClick={() => addTaskToBasket(task)} /></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FrontPage
