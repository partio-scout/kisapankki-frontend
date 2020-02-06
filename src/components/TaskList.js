import React, { useState, useEffect } from 'react'
import taskService from '../services/task'
import Task from '../components/Task'
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'


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
        {tasks.map(task => 
        <ul key={task.id}>
        <Link to={`/task/${task.id}`}>{task.name}</Link>
        <Route exact path="/task/:id" render={() => <Task task={task}/>} />
        
        </ul>)}


        
     

        
      </div>
    </Router>
  )
}

export default TaskList