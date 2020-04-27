import React from 'react'
import { Link } from 'react-router-dom'
import TaskListPending from './TaskListPending'
import CommentListPending from './CommentListPending'

const Admin = ({ handleAddTask, handleUpdateTask, handleDeleteTask }) => (
  <div >
    <TaskListPending handleAddTask={handleAddTask} handleUpdateTask={handleUpdateTask} handleDeleteTask={handleDeleteTask} />
    <CommentListPending/>
    <Link className="no-underline" to="/omasivu">Omat tiedot</Link>
    <br />
    <Link className="no-underline" to="/lisaa_admin">Lisää ylläpitäjä</Link>
    <br />
    <Link className="no-underline" to="/lisaa_pudotusvalikkoon">Hallinnoi sääntöjä, kieliä, sarjoja ja kategorioita</Link>
  </div>
)

export default Admin
