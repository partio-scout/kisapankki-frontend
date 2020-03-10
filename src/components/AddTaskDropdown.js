import React, { useState } from 'react'
import Rule from './Rule'
import Language from './Language'
import Series from './Series'
import Category from './Category'

const AddTaskDropdown = () => {
  const [showCategories, setShowCategories] = useState(false)


  return (
    <div >
      {showCategories ?
        <React.Fragment>
          <button className = "hoo" onClick={() => setShowCategories(!showCategories)}>Sulje kategoriat</button>
          <Category />
        </React.Fragment>
        :
        <button className = "hoo" onClick={() => setShowCategories(!showCategories)}>Kategoriat</button>
      }
      <Language />
      <Series />
      <Rule />
    </div>
  )
}

export default AddTaskDropdown
