import React, { useState } from 'react'
import Notification from './Notification'

const Admin = () => {

  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <div>
      <h2>Admin-alue</h2>
      <Notification message={errorMessage} />
    </div>
  )
}

export default Admin
