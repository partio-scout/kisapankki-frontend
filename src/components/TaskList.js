import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import taskService from '../services/task'
import ageGroupService from '../services/ageGroup'
import ruleService from '../services/rule'
import categoryService from '../services/category'
import Notification from './Notification'
<<<<<<< HEAD
import Select from 'react-select'

=======
import Search from './Search'
>>>>>>> master


const TaskList = ({ user }) => {
  const [allTasks, setAllTasks] = useState([])
  const [tasks, setTasks] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [selectedRules, setSelectedRule] = useState('')
  const [selectedAgeGroups, setSelectedAgeGroup] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [ageGroups, setAgeGroups] = useState([])
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
    ageGroupService.getAgeGroups().then((response) => {
      setAgeGroups(response)
    })
  }, [])

  useEffect(() => {
    ruleService.getRules().then((response) => {
      setRules(response)
    })
  }, [])

  useEffect(() => {
    if (selectedCategory && selectedCategory.id) {
      const s = allTasks.filter(task => task.category.id === selectedCategory.id)
      setTasks(s)
    }
  }, [selectedCategory])

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

  const handleAgeGroupFiltering = (ageGroup) => {
    setSelectedAgeGroup(ageGroup)

  }

  const handleRuleFiltering = (rule) => {
    setSelectedRule(rule)
  }

  // const toggleClearable = () =>
  //   setIsClearable(!isClearable)

  return (
    <div className="task-list">
      <h1>Kisatehtäväpankki</h1>

      <div className="task-list-select">
        <Select className="task-list-select"
          getOptionLabel={option => `${option.category}`}
          getOptionValue={option => `${option.category}`}
          onChange={handleCategoryFiltering}
          options={categories}
          isClearable={isClearable}
        />

        <Select className="task-list-select"
          getOptionLabel={option => `${option.name}`}
          getOptionValue={option => `${option.name}`}
          onChange={handleAgeGroupFiltering}
          options={ageGroups}
          isClearable={isClearable}

        />
        <Select className="task-list-select"
          getOptionLabel={option => `${option.rules}`}
          getOptionValue={option => `${option.rules}`}
          onChange={handleRuleFiltering}
          options={rules}
          isClearable={isClearable}

        />

      </div>

      <Search setTasks={setTasks} />
      <Notification message={errorMessage} />
      {tasks.map((task) => (
        <div className="task-list-item" key={task.id}>
          <span>
            <Link to={`/tehtava/${task.id}`}>
              {task.name}
            </Link>
          </span>
          <span>{task.ageGroup.name}</span>
          <span>{task.category.category}</span>

          {user !== null &&
            <span><button className="delete-button" onClick={() => handleDelete(task)}>Poista</button></span>
          }
        </div>
      ))}
    </div>

  )
}

export default TaskList
