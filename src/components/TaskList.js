import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import taskService from '../services/task'
import seriesService from '../services/series'
import ruleService from '../services/rule'
import categoryService from '../services/category'
import Notification from './Notification'
import Select from 'react-select'
import Search from './Search'
import StarRatings from 'react-star-ratings'
import Filter from './Filter'

const TaskList = ({ user, originalTasks, addTaskToBasket, handleUpdateViews }) => {
  const [tasks, setTasks] = useState(originalTasks)
  const [allTasks, setAllTasks] = useState(originalTasks)
  const [errorMessage, setErrorMessage] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedSeries, setSelectedSeries] = useState([])
  const [selectedRules, setSelectedRules] = useState('')
  const [categories, setCategories] = useState([])
  const [series, setSeries] = useState([])
  const [rules, setRules] = useState([])
  const [isClearable, setIsClearable] = useState(true)
  const [seriess, setSeriess] = useState([])

  useEffect(() => {
    categoryService.getCategories().then((response) => {
      setCategories(response)
    })

    seriesService.getSeries().then((response) => {
      setSeriess(response)
    })

    ruleService.getRules().then((response) => {
      setRules(response)
    })
  }, [])

  useEffect(() => {
    setTasks(originalTasks)
    setAllTasks(originalTasks)
  }, [originalTasks])



  const handleDelete = async (task) => {
    try {
      if (window.confirm(`Haluatko poistaa tehtävän: ${task.name}`)) {
        await taskService.deleteTask(task.id)
        setTasks(tasks.filter(t => t.id !== task.id))
      }
    } catch (exeption) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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

  const compareNamesAsc = (a, b) => {
    return b.name.localeCompare(a.name)
  }

  const compareNamesDesc = (a, b) => {
    return a.name.localeCompare(b.name)
  }

  const compareRatingsAsc = (a, b) => {
    return a.ratingsAVG - b.ratingsAVG
  }

  const compareRatingsDesc = (a, b) => {
    return b.ratingsAVG - a.ratingsAVG
  }

  return (
    <div className="task-list">
      <h1>Kisatehtäväpankki</h1>
      <div className="search-filter-container">
        <div className="search"><Search setTasks={setTasks} setAllTasks={setAllTasks} /></div>
        <div className="search"> <Filter tasks={tasks} allTasks={allTasks} categories={categories} rules={rules} series={seriess}/> </div>
      </div>

      <Notification message={errorMessage} />
      {tasks && tasks.length > 0 &&
        <div className="task-list-title">
          <span className="arrow-inline">Tehtävän nimi <span className="arrow-container"><i className="name-arrow-up" onClick={handleSortByNameAsc} /><i className="name-arrow-down" onClick={handleSortByNameDesc} /></span></span>
          <span>Sarja</span>
          <span>Kategoria</span>
          <span className="arrow-inline">Arvostelu <span className="arrow-container"><i className="rating-arrow-up" onClick={handleSortByRatingsAsc} /><i className="rating-arrow-down" onClick={handleSortByRatingsDesc} /></span></span>
          {user && <span></span>}
          <span></span>
        </div>
      }
      {tasks.map((task) => (
        <div className="task-list-item" key={task.id}>
          <span>
            <Link to={`/tehtava/${task.id}`} onClick={() => handleUpdateViews(task.id)}>
              {task.name}
            </Link>
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
          {user && <span className="task-list-delete"><button className="delete-button" onClick={() => handleDelete(task)}>Poista</button></span>}
          <span><div className="black-basket" onClick={() => addTaskToBasket(task)} /></span>
        </div>
      ))}
    </div>

  )
}

export default TaskList



