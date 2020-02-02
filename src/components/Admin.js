import React, { useState } from 'react'
import Notification from './Notification'
import Rule from './Rule'
import Language from './Language'
import AgeGroup from './AgeGroup'
import Category from './Category'

const Admin = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <div>
      <Notification message={errorMessage} />
      <Rule />
      <Language />
      <AgeGroup />
      <Category />
    </div>
  )
}

export default Admin
