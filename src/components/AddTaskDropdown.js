import React, { useState } from 'react'
import Rule from './Rule'
import Language from './Language'
import Series from './Series'
import Category from './Category'

const AddTaskDropdown = () => {
  const [showCategories, setShowCategories] = useState(false)
  const [showRules, setShowRules] = useState(false)


  return (
    <div >
      {showCategories ?
        <React.Fragment>
          <button className="task-types" onClick={() => setShowCategories(!showCategories)}>Sulje kategoriat</button>
          <Category />
        </React.Fragment>
        :
        <button className="task-types" onClick={() => setShowCategories(!showCategories)}>Kategoriat</button>
      }
      <Language />
      <Series />
      {showRules ?
        <React.Fragment>
          <button className="task-types" onClick={() => setShowRules(!showRules)}>Sulje säännöt</button>
          <Rule />
        </React.Fragment>
        :
        <button className="task-types" onClick={() => setShowRules(!showRules)}>Säännöt</button>
      }
    </div>
  )
}

export default AddTaskDropdown
