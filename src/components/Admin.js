import React from 'react'
import { Link } from 'react-router-dom'
import TaskListPending from './TaskListPending'

const Admin = () => (
  <div>
    <TaskListPending />
    <Link to="/omasivu">Omat tiedot</Link>
    <br />
    <Link to="/lisaa_admin">Lisää ylläpitäjä</Link>
    <br />
    <Link to="/lisaa_pudotusvalikkoon">Lisää sääntö/kieli/sarja/kategoria</Link>
  </div>
)

export default Admin
