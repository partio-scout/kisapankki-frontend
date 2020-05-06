import React from 'react'
import { Link } from 'react-router-dom'
import TaskListPending from './TaskListPending'
import CommentListPending from './CommentListPending'

const Admin = ({ handleAddTask, handleUpdateTask, handleDeleteTask }) => (
  <div>
    <TaskListPending handleAddTask={handleAddTask} handleUpdateTask={handleUpdateTask} handleDeleteTask={handleDeleteTask} />
    <CommentListPending/>
    <div className="admin-list"><Link className="no-underline" to="/omasivu">Omat tiedot</Link></div>
    <div className="admin-list"><Link className="no-underline" to="/lisaa_admin">Lisää ylläpitäjä</Link></div>
    <div className="admin-list"><Link className="no-underline" to="/lisaa_pudotusvalikkoon">Hallinnoi sääntöjä, kieliä, sarjoja ja kategorioita</Link></div>
  </div>
)

export default Admin
