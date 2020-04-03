import React from 'react'
import { Link } from 'react-router-dom'
import TaskListPending from './TaskListPending'

const Admin = () => (
  <div >
    <TaskListPending />
    <Link className="no-underline" to="/omasivu">Omat tiedot</Link>
    <br />
    <Link className="no-underline" to="/lisaa_admin">Lisää ylläpitäjä</Link>
    <br />
    <Link className="no-underline" to="/lisaa_pudotusvalikkoon">Hallinnoi sääntöjä/kieliä/sarjoja/kategorioita</Link>
  </div>
)

export default Admin
