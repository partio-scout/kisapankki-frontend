import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import taskService from '../services/task'
import Notification from './Notification'
import Search from './Search'
import StarRatings from 'react-star-ratings'
import Filter from './Filter'
import Moment from 'react-moment'

const TaskList = ({ user, originalTasks, categories, rules, seriess, addTaskToBasket, handleUpdateTask, handleDeleteTask }) => {
  const [tasks, setTasks] = useState(originalTasks)
  const [allTasks, setAllTasks] = useState(originalTasks)
  const [errorMessage, setErrorMessage] = useState(null)
  const [nameAsc, setNameAsc] = useState(false)
  const [ratingDesc, setRatingDesc] = useState(false)
  const [dateDesc, setDateDesc] = useState(false)

  useEffect(() => {
    setTasks(originalTasks)
    setAllTasks(originalTasks)
  }, [originalTasks])

  const handleUpdateViews = async (task) => {
    try {
      await taskService.updateViews(task.id)
      handleUpdateTask({ ...task, views: task.views + 1 })
    } catch (exeption) {
    }
  }

  const handleDelete = async (e, task) => {
    e.preventDefault()
    try {
      if (window.confirm(`Haluatko poistaa tehtävän: ${task.name}`)) {
        await taskService.deleteTask(task.id)
        handleDeleteTask(task.id)
      }
    } catch (exeption) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleSortByName = () => {
    if (nameAsc) {
      setTasks(tasks.sort(compareNamesDesc).concat([]))
    } else {
      setTasks(tasks.sort(compareNamesAsc).concat([]))
    }
    setNameAsc(!nameAsc)
  }

  const handleSortByRating = () => {
    if (ratingDesc) {
      setTasks(tasks.sort(compareRatingsAsc).concat([]))
    } else {
      setTasks(tasks.sort(compareRatingsDesc).concat([]))
    }
    setRatingDesc(!ratingDesc)
  }

  const handleSortByDate = () => {
    if (dateDesc) {
      setTasks(tasks.sort(compareCreatedAsc).concat([]))
    } else {
      setTasks(tasks.sort(compareCreatedDesc).concat([]))
    }
    setDateDesc(!dateDesc)
  }

  const handleSortByNameAsc = () => {
    setTasks(tasks.sort(compareNamesAsc).concat([]))
  }

  const handleSortByNameDesc = () => {
    setTasks(tasks.sort(compareNamesDesc).concat([]))
  }

  const handleSortByRatingsAsc = () => {
    setTasks(tasks.sort(compareRatingsAsc).concat([]))
  }

  const handleSortByRatingsDesc = () => {
    setTasks(tasks.sort(compareRatingsDesc).concat([]))
  }

  const handleSortByCreatedAsc = () => {
    setTasks(tasks.sort(compareCreatedAsc).concat([]))
  }

  const handleSortByCreatedDesc = () => {
    setTasks(tasks.sort(compareCreatedDesc).concat([]))
  }

  const compareNamesAsc = (a, b) => {
    return a.name.localeCompare(b.name)
  }

  const compareNamesDesc = (a, b) => {
    return b.name.localeCompare(a.name)
  }

  const compareRatingsAsc = (a, b) => {
    return a.ratingsAVG - b.ratingsAVG
  }

  const compareRatingsDesc = (a, b) => {
    return b.ratingsAVG - a.ratingsAVG
  }

  const compareCreatedAsc = (a, b) => {
    return a.created.localeCompare(b.created)
  }

  const compareCreatedDesc = (a, b) => {
    return b.created.localeCompare(a.created)
  }

  return (
    <div className="task-list">
      <h1>Kisatehtäväpankki</h1>
      <div className="search-filter-container">
        <Search
          setTasks={setTasks}
          setAllTasks={setAllTasks}
        />
        <Filter
          tasks={tasks}
          allTasks={allTasks}
          categories={categories}
          rules={rules}
          series={seriess}
          setTasks={setTasks}
        />
      </div>

      <Notification message={errorMessage} />
      {tasks && tasks.length > 0 &&
        <div className="task-list-title">
          <span className="arrow-inline"><div onClick={handleSortByName}>Tehtävän nimi</div><div className="arrow-container"><i className="name-arrow-up" onClick={handleSortByNameDesc} /><i className="name-arrow-down" onClick={handleSortByNameAsc} /></div></span>
          <span>Sarja</span>
          <span>Kategoria</span>
          <span className="arrow-inline"><div onClick={handleSortByRating}>Arvostelu</div><div className="arrow-container"><i className="rating-arrow-up" onClick={handleSortByRatingsAsc} /><i className="rating-arrow-down" onClick={handleSortByRatingsDesc} /></div></span>
          <span className="arrow-inline"><div onClick={handleSortByDate}>Lisätty</div><div className="arrow-container"><i className="created-arrow-up" onClick={handleSortByCreatedAsc} /><i className="created-arrow-down" onClick={handleSortByCreatedDesc} /></div></span>
          {user && <span></span>}
          <span></span>
        </div>
      }
      {tasks.map((task) => (
        <Link className="no-underline" to={`/tehtava/${task.id}`} onClick={() => handleUpdateViews(task)} key={task.id}>
          <div className="task-list-item">
            <span className="span-bigger">
              <p className="bigger-task-name">{task.name}</p>
              <p>Katselukertoja: {task.views}</p>
            </span>
            <span>{task.series.map(s => <div key={task.id + s.id}>{s.name} </div>)}</span>
            <span>{task.category && task.category.name}</span>
            <span>
              <StarRatings
                rating={task.ratingsAVG}
                starRatedColor="#f0e105"
                starDimension="20px"
                starSpacing="10px"
              />
            </span>
            {task.created && <span><Moment format="DD.MM.YYYY HH:mm">{task.created}</Moment></span>}
            {user && <span className="task-list-delete"><button className="delete-button" onClick={(e) => handleDelete(e, task)}>Poista</button></span>}
            <span><div className="black-basket" title="Lisää koriin" onClick={(e) => addTaskToBasket(e, task)} /></span>
          </div>
        </Link>
      ))}

    </div>

  )
}

export default TaskList

