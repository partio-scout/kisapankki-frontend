import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FrontPageInfo from './FrontPageInfo'
import taskService from '../../services/task'

const FrontPage = ({ tasks, addTaskToBasket, handleUpdateTask }) => {
  const [newTasks, setNewTasks] = useState([])
  const [favoriteTasks, setFavoriteTasks] = useState([])

  useEffect(() => {
    setNewTasks([...tasks].sort(compareCreated).slice(0, 5))
    setFavoriteTasks([...tasks].sort(compareRatings).slice(0, 5))
  }, [tasks])

  const handleUpdateViews = async (task) => {
    try {
      await taskService.updateViews(task.id)
      handleUpdateTask({ ...task, views: task.views + 1 })
    } catch (exeption) {
    }
  }

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
              <Link className="no-underline" to={`/tehtava/${task.id}`} onClick={() => handleUpdateViews(task)} key={task.id}>
                <div className="task-list-item frontpage-item new-item">
                  <div className="black-basket-mobile" title="Lisää koriin" onClick={(e) => addTaskToBasket(e, task)} />
                  <span className="span-bigger">
                    <p className="bigger-task-name-frontpage">{task.name}</p>
                    <p>Katselukertoja: {task.views}</p>
                  </span>
                  <span>{task.series.map(s => <div key={task.id + s.id}>{s.name} </div>)}</span>
                  <span>{task.category && task.category.name}</span>
                  <span><div className="black-basket" title="Lisää koriin" onClick={(e) => addTaskToBasket(e, task)} /></span>
                </div>
              </Link>
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
              <Link className="no-underline" to={`/tehtava/${task.id}`} onClick={() => handleUpdateViews(task)} key={task.id}>
                <div className="task-list-item frontpage-item favorite-item">
                  <div className="black-basket-mobile" title="Lisää koriin" onClick={(e) => addTaskToBasket(e, task)} />
                  <span className="span-bigger">
                    <p className="bigger-task-name-frontpage">{task.name}</p>
                    <p>Katselukertoja: {task.views}</p>
                  </span>
                  <span>{task.series.map(s => <div key={task.id + s.id}>{s.name} </div>)}</span>
                  <span>{task.category && task.category.name}</span>
                  <span><div className="black-basket" title="Lisää koriin" onClick={(e) => addTaskToBasket(e, task)} /></span>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </div>
      <footer>
        <p>Kuva: Suomen Partiolaiset/Eeva Helle</p>
      </footer>
    </div>
  )
}

export default FrontPage
