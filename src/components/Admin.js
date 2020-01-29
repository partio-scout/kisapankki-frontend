import React, { useState } from 'react'
import Notification from './Notification'
import Rule from './Rule'

const Admin = () => {

  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <div>
      <h2>Admin-alue</h2>
      <Notification message={errorMessage} />
      <Rule />
    </div>
  )
}

export default Admin
