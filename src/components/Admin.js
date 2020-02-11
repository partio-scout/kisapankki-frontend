import React from 'react'
import { Link } from 'react-router-dom'
import TaskListPending from './TaskListPending'

const Admin = () => (
  <div>
    <h2>Hyväksyntää odottavat kisatehtävät</h2>
    <TaskListPending />
    <Link to="/lisaa_admin">Lisää ylläpitäjä</Link>
    <br />
    <Link to="/lisaa_pudotusvalikkoon">Lisää pudotusvalikkoon</Link>
  </div>
)

export default Admin
