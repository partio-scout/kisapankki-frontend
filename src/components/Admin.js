import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => (
  <div>
    <h2>Admin-sivu</h2>
    <Link to="/lisaa_admin">Lisää ylläpitäjä</Link>
    <br />
    <Link to="/lisaa_pudotusvalikkoon">Lisää pudotusvalikkoon</Link>
  </div>
)

export default Admin
