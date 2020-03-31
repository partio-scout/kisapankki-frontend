import React, { useState, useEffect } from 'react'
import Select from 'react-select'


const Filter = ({ allTasks, categories, rules, series, tasks, setTasks }) => {

  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedSeries, setSelectedSeries] = useState([])
  const [selectedRules, setSelectedRules] = useState('')


  useEffect(() => {
    if (selectedSeries.length > 0 && selectedCategory.length > 0 && selectedRules) {
      let array = []
      for (let i = 0; i < allTasks.length; i++) {
        for (let j = 0; j < allTasks[i].series.length; j++) {
          if (selectedSeries.includes(allTasks[i].series[j].id) && selectedCategory.includes(allTasks[i].category.id) && allTasks[i].rules.id === selectedRules.id && !array.includes(allTasks[i])) {
            array.push(allTasks[i])
          }
        }
      }
      setTasks(array)
    } else if (selectedSeries.length > 0 && selectedCategory.length > 0) {
      let array = []
      for (let i = 0; i < allTasks.length; i++) {
        for (let j = 0; j < allTasks[i].series.length; j++) {
          if (selectedSeries.includes(allTasks[i].series[j].id) && selectedCategory.includes(allTasks[i].category.id) && !array.includes(allTasks[i])) {
            array.push(allTasks[i])
          }
        }
      }
      setTasks(array)
    } else if (selectedSeries.length > 0 && selectedRules) {
      let array = []
      for (let i = 0; i < allTasks.length; i++) {
        for (let j = 0; j < allTasks[i].series.length; j++) {
          if (selectedSeries.includes(allTasks[i].series[j].id) && allTasks[i].rules.id === selectedRules.id && !array.includes(allTasks[i])) {
            array.push(allTasks[i])
          }
        }
      }
      setTasks(array)
    } else if (selectedCategory.length > 0 && selectedRules) {
      setTasks(allTasks.filter(task => selectedCategory.includes(task.category.id) && task.rules.id === selectedRules.id))
    } else if (selectedSeries.length > 0) {
      let array = []
      for (let i = 0; i < allTasks.length; i++) {
        for (let j = 0; j < allTasks[i].series.length; j++) {
          if (selectedSeries.includes(allTasks[i].series[j].id) && !array.includes(allTasks[i])) {
            array.push(allTasks[i])
          }
        }
      }
      setTasks(array)
    } else if (selectedCategory.length > 0) {
      setTasks(allTasks.filter(task => selectedCategory.includes(task.category.id)))
    } else if (selectedRules) {
      setTasks(allTasks.filter(task => task.rules.id === selectedRules.id))
    } else {
      setTasks(allTasks)
    }
  }, [selectedCategory, selectedSeries, selectedRules])

  const handleSeriesFiltering = (series) => {
    if (series && series.length > 0) {
      setSelectedSeries(series.map(s => s.id))
    } else {
      setSelectedSeries([])
      setTasks(allTasks)
    }
  }

  const handleCategoryFiltering = (category) => {
    if (category && category.length > 0) {
      setSelectedCategory(category.map(c => c.id))
    } else {
      setSelectedCategory([])
      setTasks(allTasks)
    }
  }

  const handleRuleFiltering = (rules) => {
    if (rules) {
      setSelectedRules(rules)
    } else {
      setSelectedRules('')
      setTasks(allTasks)
    }
  }

  return (
    <div className="search-filter-container">
      <div className="filter">
        <Select
          name="filter-series"
          getOptionLabel={option => `${option.name}`}
          getOptionValue={option => `${option.id}`}
          onChange={handleSeriesFiltering}
          options={series}
          isClearable={true}
          placeholder={"Sarja"}
          isMulti={true}
        />
      </div>

      <div className="filter">
        <Select
          name="filter-category"
          getOptionLabel={option => `${option.name}`}
          getOptionValue={option => `${option.id}`}
          onChange={handleCategoryFiltering}
          options={categories}
          isClearable={true}
          placeholder={"Kategoria"}
          isMulti={true}
        />
      </div>

      <div className="filter">
        <Select
          name="filter-rules"
          getOptionLabel={option => `${option.name}`}
          getOptionValue={option => `${option.id}`}
          onChange={handleRuleFiltering}
          options={rules}
          isClearable={true}
          placeholder={"Säännöt"}
        />
      </div>
    </div>
  )
}

export default Filter