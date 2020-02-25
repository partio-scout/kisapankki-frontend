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
  const [selectedRules, setSelectedRules] = useState('')
  const [selectedSeries, setSelectedSeries] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [seriess, setSeriess] = useState([])
  const [rules, setRules] = useState([])
  const [isClearable, setIsClearable] = useState(true)



  useEffect(() => {
    taskService.getTasks().then((response) => {
      setTasks(response)
      setAllTasks(response)
    })
  }, [])

  useEffect(() => {
    categoryService.getCategories().then((response) => {
      setCategories(response)
    })
  }, [])

  useEffect(() => {
    seriesService.getSeries().then((response) => {
      setSeriess(response)
    })
  }, [])

  useEffect(() => {
    ruleService.getRules().then((response) => {
      setRules(response)
    })
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      setTasks(allTasks.filter(task => task.category.id === selectedCategory.id))
    }
  }, [selectedCategory])

  useEffect(() => {
    if (selectedSeries) {
      setTasks(allTasks.map(task => task.series.id).filter(id => id === selectedSeries.id))
    }
  }, [selectedSeries])

  useEffect(() => {
    if (selectedRules) {
      setTasks(allTasks.filter(task => task.rules.id === selectedRules.id))
    }
  }, [selectedRules])



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
      setSelectedCategory("")
      setTasks(allTasks)
    }
  }

  const handleSeriesFiltering = (series) => {
    if (series) {
      setSelectedSeries(series)
    } else {
      setSelectedSeries("")
      setTasks(allTasks)
    }
  }
  const handleRuleFiltering = (rules) => {
    if (rules) {
      setSelectedRules(rules)
    } else {
      setSelectedRules("")
      setTasks(allTasks)
    }
  }


  return (
    <div className="task-list">
      <h1>Kisatehtäväpankki</h1>

      <div className="task-list-filter">
        <Search setTasks={setTasks} />

        <Select className="task-list-select"
          getOptionLabel={option => `${option.name}`}
          getOptionValue={option => `${option.name}`}
          onChange={handleCategoryFiltering}
          options={categories}
          isClearable={isClearable}
          placeholder="Kategoria"
        />

        <Select className="task-list-select"
          getOptionLabel={option => `${option.name}`}
          getOptionValue={option => `${option.name}`}
          onChange={handleSeriesFiltering}
          options={seriess}
          isClearable={isClearable}
          placeholder="Sarja"

        />
        <Select className="task-list-select"
          getOptionLabel={option => `${option.name}`}
          getOptionValue={option => `${option.name}`}
          onChange={handleRuleFiltering}
          options={rules}
          isClearable={isClearable}
          placeholder="Säännöt"

        />
      </div>

      <Notification message={errorMessage} />
      {tasks.map((task) => (
        <div className="task-list-item" key={task.id}>
          <span>
            <Link to={`/tehtava/${task.id}`}>
              {task.name}
            </Link>
          </span>
          <span>{task.series.map(s => <div key={task.id + s.id}>{s.name} </div>)}</span>
          <span>{task.category.name}</span>

          {user !== null &&
            <span><button className="delete-button" onClick={() => handleDelete(task)}>Poista</button></span>
          }
        </div>
      ))}
    </div>

  )
}

export default TaskList
