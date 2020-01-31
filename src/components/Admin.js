import React, { useState } from 'react'
import Notification from './Notification'
import Rule from './Rule'
import Language from './Language'

const Admin = () => {

  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <div>
      <h2>Admin-alue</h2>
      <Notification message={errorMessage} />
      <Rule />
      <Language />
    </div>
  )
}

export default Admin
