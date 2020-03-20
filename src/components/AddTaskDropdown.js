import React, { useState, useEffect, Fragment } from 'react'
import Rule from './Rule'
import Language from './Language'
import Series from './Series'
import Category from './Category'
import ruleService from '../services/rule'
import seriesService from '../services/series'
import languageService from '../services/language'
import categoryService from '../services/category'

const AddTaskDropdown = () => {
  const [rules, setRules] = useState([])
  const [categories, setCategories] = useState([])
  const [languages, setLanguages] = useState([])
  const [series, setSeries] = useState([])
  const [showCategories, setShowCategories] = useState(false)
  const [showRules, setShowRules] = useState(false)
  const [showLanguages, setShowLanguages] = useState(false)
  const [showSeries, setShowSeries] = useState(false)

  useEffect(() => {
    ruleService.getRules().then((response) => {
      setRules(response)
    })
    categoryService.getCategories().then((response) => {
      setCategories(response)
    })
    seriesService.getSeries().then((response) => {
      setSeries(response)
    })
    languageService.getLanguages().then((response) => {
      setLanguages(response)
    })
  }, [])

  return (
    <div className="crls-container">
      <div className="task-types-menu">
        {showCategories ?
          <Fragment>
            <button className="task-types" onClick={() => setShowCategories(!showCategories)}>Sulje kategoriat</button>
            <Category categories={categories} setCategories={setCategories} />
          </Fragment>
          :
          <button className="task-types" onClick={() => setShowCategories(!showCategories)}>Kategoriat</button>
        }
      </div>
      <div className="task-types-menu">
        {showLanguages ?
          <Fragment>
            <button className="task-types" onClick={() => setShowLanguages(!showLanguages)}>Sulje kielet</button>
            <Language languages={languages} setLanguages={setLanguages} />
          </Fragment>
          :
          <button className="task-types" onClick={() => setShowLanguages(!showLanguages)}>Kielet</button>
        }
      </div>
      <div className="task-types-menu">
        {showSeries ?
          <Fragment>
            <button className="task-types" onClick={() => setShowSeries(!showSeries)}>Sulje sarjat</button>
            <Series series={series} setSeries={setSeries} />
          </Fragment>
          :
          <button className="task-types" onClick={() => setShowSeries(!showSeries)}>Sarjat</button>
        }
      </div>
      <div className="task-types-menu">
        {showRules ?
          <Fragment>
            <button className="task-types" onClick={() => setShowRules(!showRules)}>Sulje säännöt</button>
            <Rule rules={rules} setRules={setRules} categories={categories} />
          </Fragment>
          :
          <button className="task-types" onClick={() => setShowRules(!showRules)}>Säännöt</button>
        }
      </div>
    </div>
  )
}

export default AddTaskDropdown
