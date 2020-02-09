import React, { useState, useEffect, Fragment } from 'react'
import taskService from '../services/task'
import { Link } from 'react-router-dom'


const TaskList = (user) => {

  const [tasks, setTasks] = useState([])
  

  useEffect(() => {
    taskService.getTasks().then(response => {
      setTasks(response)
    })
  }, [])


  return (
    <div className="task-list">
      <h1>Kisatehtäväpankki</h1>

        
         
        

       
          {tasks.map(task =>

          <div className = {`task-list-item ${task.ageGroup.name.toLowerCase()}`} key={task.id}>
             
           
             <span><Link to={`/tehtava/${task.id}`}>{task.name}</Link></span>

              <span className = "task-list-agegroup">{task.ageGroup.name}</span>

              <span className= "task-list-category">{task.category.category}</span>
            {user &&
            <Fragment>
              <button>Hyväksy</button>
              <button>Muokkaa</button>
              <button>Poista</button>
              </Fragment>
            }
            </div>
         
          )}

     

     

    </div>

  )
}

export default TaskList