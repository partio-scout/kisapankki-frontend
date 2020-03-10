import React, { useState } from 'react'
import Rule from './Rule'
import Language from './Language'
import Series from './Series'
import Category from './Category'

const AddTaskDropdown = () => {
  const [showRules, setShowRules] = useState(false)


  return (
    <div >

      {showRules ?
        <React.Fragment>
          <button className = "hoo" onClick={() => setShowRules(!showRules)}>Sulje säännöt</button>
          <Rule />
        </React.Fragment>
        :
        <button className = "hoo" onClick={() => setShowRules(!showRules)}>Säännöt</button>
      }
      <Language />
      <Series />
      <Category />
    </div>
  )
}

export default AddTaskDropdown
