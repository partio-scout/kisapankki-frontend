import React, { useState, useEffect } from 'react'
import taskService from '../services/task'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import Login from './Login'

const TaskList = () => {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    taskService.getTasks().then(response => {
      setTasks(response)
    })
  }, [])


  return (
    <Router>
      <div className="task-list">
        <h2>Tehtävät</h2>
        {tasks.map(task => <ul key={task.id}><Link to={`/tasks`}>{task.name}</Link></ul>)}
        <Route path="/tasks" render={() => <Login />} />
      </div>
    </Router>
  )
}

export default TaskList