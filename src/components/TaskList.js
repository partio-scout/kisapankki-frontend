import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import taskService from '../services/task'
import seriesService from '../services/series'
import ruleService from '../services/rule'
import categoryService from '../services/category'
import Notification from './Notification'
import Select from 'react-select'
import Search from './Search'

const TaskList = ({ user, originalTasks, addTaskToBasket }) => {
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

  useEffect(() => {
    if (selectedSeries.length > 0 && selectedCategory.length > 0 && selectedRules) {
      let array = []
      for (let i = 0; i < allTasks.length; i++) {
        for (let j = 0; j < allTasks[i].series.length; j++) {
          if (selectedSeries.includes(allTasks[i].series[j].id) && selectedCategory.includes(allTasks[i].category.id) && allTasks[i].rules.id === selectedRules.id && !array.includes(allTasks[i])) {
            array.push(allTasks[i])
          }
        }
      }
      setTasks(array)
    } else if (selectedSeries.length > 0 && selectedCategory.length > 0) {
      let array = []
      for (let i = 0; i < allTasks.length; i++) {
        for (let j = 0; j < allTasks[i].series.length; j++) {
          if (selectedSeries.includes(allTasks[i].series[j].id) && selectedCategory.includes(allTasks[i].category.id) && !array.includes(allTasks[i])) {
            array.push(allTasks[i])
          }
        }
      }
      setTasks(array)
    } else if (selectedSeries.length > 0 && selectedRules) {
      let array = []
      for (let i = 0; i < allTasks.length; i++) {
        for (let j = 0; j < allTasks[i].series.length; j++) {
          if (selectedSeries.includes(allTasks[i].series[j].id) && allTasks[i].rules.id === selectedRules.id && !array.includes(allTasks[i])) {
            array.push(allTasks[i])
          }
        }
      }
      setTasks(array)
    } else if (selectedCategory.length > 0 && selectedRules) {
      setTasks(allTasks.filter(task => selectedCategory.includes(task.category.id) && task.rules.id === selectedRules.id))
    } else if (selectedSeries.length > 0) {
      let array = []
      for (let i = 0; i < allTasks.length; i++) {
        for (let j = 0; j < allTasks[i].series.length; j++) {
          if (selectedSeries.includes(allTasks[i].series[j].id) && !array.includes(allTasks[i])) {
            array.push(allTasks[i])
          }
        }
      }
      setTasks(array)
    } else if (selectedCategory.length > 0) {
      setTasks(allTasks.filter(task => selectedCategory.includes(task.category.id)))
    } else if (selectedRules) {
      setTasks(allTasks.filter(task => task.rules.id === selectedRules.id))
    } else {
      setTasks(allTasks)
    }
  }, [selectedCategory, selectedSeries, selectedRules])

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

  const handleSeriesFiltering = (series) => {
    if (series && series.length > 0) {
      setSelectedSeries(series.map(s => s.id))
    } else {
      setSelectedSeries([])
      setTasks(allTasks)
    }
  }

  const handleCategoryFiltering = (category) => {
    if (category && category.length > 0) {
      setSelectedCategory(category.map(c => c.id))
    } else {
      setSelectedCategory([])
      setTasks(allTasks)
    }
  }

  const handleRuleFiltering = (rules) => {
    if (rules) {
      setSelectedRules(rules)
    } else {
      setSelectedRules('')
      setTasks(allTasks)
    }
  }

  return (
    <div className="task-list">
      <h1>Kisatehtäväpankki</h1>
      <div className="search-filter-container">
        <div className="search"><Search setTasks={setTasks} setAllTasks={setAllTasks} /></div>

        <div className="filter">
          <Select
            name="filter-series"
            getOptionLabel={option => `${option.name}`}
            getOptionValue={option => `${option.id}`}
            onChange={handleSeriesFiltering}
            options={seriess}
            isClearable={isClearable}
            placeholder={"Sarja"}
            isMulti={true}
          />
        </div>

        <div className="filter">
          <Select
            name="filter-category"
            getOptionLabel={option => `${option.name}`}
            getOptionValue={option => `${option.id}`}
            onChange={handleCategoryFiltering}
            options={categories}
            isClearable={isClearable}
            placeholder={"Kategoria"}
            isMulti={true}
          />
        </div>

        <div className="filter">
          <Select
            name="filter-rules"
            getOptionLabel={option => `${option.name}`}
            getOptionValue={option => `${option.id}`}
            onChange={handleRuleFiltering}
            options={rules}
            isClearable={isClearable}
            placeholder={"Säännöt"}
          />
        </div>
      </div>

      <Notification message={errorMessage} />
      {tasks && tasks.length > 0 &&
        <div className="task-list-title">
          <span>Tehtävän nimi</span>
          <span>Sarja</span>
          <span>Kategoria</span>
          {user && <span></span>}
          <span></span>
        </div>
      }
      {tasks.map((task) => (
      <Link className="no-underline" to={`/tehtava/${task.id}`} onClick={() => taskService.updateViews(task.id)}>
        <div className="task-list-item" key={task.id}>
          <span>
              <p className="bigger-task-name">{task.name}</p>
            <p>Katselukertoja: {task.views}</p>
          </span>
          <span>{task.series.map(s => <div key={task.id + s.id}>{s.name} </div>)}</span>
          <span>{task.category && task.category.name}</span>
          {user && <span><button className="delete-button" onClick={() => handleDelete(task)}>Poista</button></span>}
          <span><div className="black-basket" onClick={() => addTaskToBasket(task)} /></span>
        </div>
        </Link>
      ))}
    </div>

  )
}

export default TaskList
