import React, { useState, Fragment } from 'react'
import Rule from './Rule'
import Language from './Language'
import Series from './Series'
import Category from './Category'

const AddTaskDropdown = () => {
  const [showCategories, setShowCategories] = useState(false)
  const [showRules, setShowRules] = useState(false)
  const [showLanguages, setShowLanguages] = useState(false)
  const [showSeries, setShowSeries] = useState(false)


  return (
    <div >
      <div className="task-types-menu">
        {showCategories ?
          <Fragment>
            <button className="task-types" onClick={() => setShowCategories(!showCategories)}>Sulje kategoriat</button>
            <Category />
          </Fragment>
          :
          <button className="task-types" onClick={() => setShowCategories(!showCategories)}>Kategoriat</button>
        }
      </div>
      <div className="task-types-menu">
        {showLanguages ?
          <Fragment>
            <button className="task-types" onClick={() => setShowLanguages(!showLanguages)}>Sulje kielet</button>
            <Language />
          </Fragment>
          :
          <button className="task-types" onClick={() => setShowLanguages(!showLanguages)}>Kielet</button>
        }
      </div>
      <div className="task-types-menu">
        {showSeries ?
          <Fragment>
            <button className="task-types" onClick={() => setShowSeries(!showSeries)}>Sulje sarjat</button>
            <Series />
          </Fragment>
          :
          <button className="task-types" onClick={() => setShowSeries(!showSeries)}>Sarjat</button>
        }
      </div>
      <div className="task-types-menu">
        {showRules ?
          <Fragment>
            <button className="task-types" onClick={() => setShowRules(!showRules)}>Sulje säännöt</button>
            <Rule />
          </Fragment>
          :
          <button className="task-types" onClick={() => setShowRules(!showRules)}>Säännöt</button>
        }
      </div>
    </div>
  )
}

export default AddTaskDropdown
