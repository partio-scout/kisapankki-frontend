import React, { useState, useEffect } from 'react'
import taskService from '../services/task'
import { Link } from 'react-router-dom'


const TaskList = () => {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    taskService.getTasks().then(response => {
      setTasks(response)
    })
  }, [])


  return (
    <div className="task-list">
      <h1>Kisatehtäväpankki</h1>

      <table className="table">

        <tbody>
          <tr>
            <th>Tehtävä</th>
            <th>Ikäryhmä</th>
            <th>Kilpailu kategoria</th>
          </tr>
          {tasks.map(task =>
            <tr key={task.id}>
              <td>
                <Link to={`/tehtava/${task.id}`}>{task.name}</Link>

              </td>
              <td> {task.ageGroup.name}</td>
              <td>{task.category.category}</td>

            </tr>
          )}

        </tbody>

      </table>

    </div>

  )
}

export default TaskList