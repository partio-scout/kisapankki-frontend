import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import taskService from '../services/task'
import seriesService from '../services/series'
import ruleService from '../services/rule'
import categoryService from '../services/category'
import Notification from './Notification'
import Select from 'react-select'
import Search from './Search'

const TaskList = ({ user }) => {
  const [allTasks, setAllTasks] = useState([])
  const [tasks, setTasks] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSeries, setSelectedSeries] = useState('')
  const [selectedRules, setSelectedRules] = useState('')
  const [categories, setCategories] = useState([])
  const [seriess, setSeriess] = useState([])
  const [rules, setRules] = useState([])
  const [isClearable, setIsClearable] = useState(true)

  useEffect(() => {
    taskService.getTasks().then((response) => {
      setTasks(response)
      setAllTasks(response)
    })

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
    if (selectedSeries && selectedCategory && selectedRules) {
      let array = []
      for (let i = 0; i < allTasks.length; i++) {
        for (let j = 0; j < allTasks[i].series.length; j++) {
          if (allTasks[i].series[j].id === selectedSeries.id && allTasks[i].category.id === selectedCategory.id && allTasks[i].rules.id === selectedRules.id) {
            array.push(allTasks[i])
          }
        }
      }
      setTasks(array)
    } else if (selectedSeries && selectedCategory) {
      let array = []
      for (let i = 0; i < allTasks.length; i++) {
        for (let j = 0; j < allTasks[i].series.length; j++) {
          if (allTasks[i].series[j].id === selectedSeries.id && allTasks[i].category.id === selectedCategory.id) {
            array.push(allTasks[i])
          }
        }
      }
      setTasks(array)
    } else if (selectedSeries && selectedRules) {
      let array = []
      for (let i = 0; i < allTasks.length; i++) {
        for (let j = 0; j < allTasks[i].series.length; j++) {
          if (allTasks[i].series[j].id === selectedSeries.id && allTasks[i].rules.id === selectedRules.id) {
            array.push(allTasks[i])
          }
        }
      }
      setTasks(array)
    } else if (selectedCategory && selectedRules) {
      setTasks(allTasks.filter(task => task.category.id === selectedCategory.id && task.rules.id === selectedRules.id))
    } else if (selectedSeries) {
      let array = []
      for (let i = 0; i < allTasks.length; i++) {
        for (let j = 0; j < allTasks[i].series.length; j++) {
          if (allTasks[i].series[j].id === selectedSeries.id) {
            array.push(allTasks[i])
          }
        }
      }
      setTasks(array)
    } else if (selectedCategory) {
      setTasks(allTasks.filter(task => task.category.id === selectedCategory.id))
    } else if (selectedRules) {
      setTasks(allTasks.filter(task => task.rules.id === selectedRules.id))
    } else {
      setTasks(allTasks)
    }
  }, [selectedCategory, selectedSeries, selectedRules])

  const handleDelete = async (task) => {
    try {
      await taskService.deleteTask(task.id)
      setTasks(tasks.filter(t => t.id !== task.id))
    } catch (exeption) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCategoryFiltering = (category) => {
    if (category) {
      setSelectedCategory(category)
    } else {
      setSelectedCategory('')
      setTasks(allTasks)
    }
  }

  const handleSeriesFiltering = (series) => {
    if (series) {
      setSelectedSeries(series)
    } else {
      setSelectedSeries('')
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
            className="filter-series"
            getOptionLabel={option => `${option.name}`}
            getOptionValue={option => `${option.id}`}
            onChange={handleSeriesFiltering}
            options={seriess}
            isClearable={isClearable}
            placeholder={"Sarja"}
          />
        </div>

        <div className="filter">
          <Select
            className="filter-category"
            getOptionLabel={option => `${option.name}`}
            getOptionValue={option => `${option.id}`}
            onChange={handleCategoryFiltering}
            options={categories}
            isClearable={isClearable}
            placeholder={"Kategoria"}
          />
        </div>

        <div className="filter">
          <Select
            className="filter-rules"
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
      <div className="task-list-title">
        <span>Tehtävän nimi</span>
        <span>Sarja</span>
        <span>Kategoria</span>
        <span></span>
      </div>
      {tasks.map((task) => (
        <div className="task-list-item" key={task.id}>
          <span>
            <Link to={`/tehtava/${task.id}`}>
              {task.name}
            </Link>
          </span>
          <span>{task.series.map(s => <div key={task.id + s.id}>{s.name} </div>)}</span>
          <span>{task.category.name}</span>
          {user && <span><button className="delete-button" onClick={() => handleDelete(task)}>Poista</button></span>
          }
        </div>
      ))}
    </div>

  )
}

export default TaskList
