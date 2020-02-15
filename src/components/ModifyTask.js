import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import taskService from '../services/task'
import ruleService from '../services/rule'
import categoryService from '../services/category'
import ageGroupService from '../services/ageGroup'
import languageService from '../services/language'


const ModifyTask = ({ setModifyVisible, task, setTask }) => {

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [name, setName] = useState(task.name)
  const [assignmentText, setAssignmentText] = useState(task.assignmentText)
  const [gradingScale, setGradingScale] = useState(task.gradingScale)
  const [supervisorInstructions, setSupervisorInstructions] = useState(task.supervisorInstructions)
  const [rules, setRules] = useState([])
  const [rule, setRule] = useState(task.rules.id)
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(task.category.id)
  const [ageGroups, setAgeGroups] = useState([])
  const [ageGroup, setAgeGroup] = useState(task.ageGroup.id)
  const [languages, setLanguages] = useState([])
  const [language, setLanguage] = useState(task.language.id)
  const [creatorName, setCreatorName] = useState(task.creatorName)
  const [creatorEmail, setCreatorEmail] = useState(task.creatorEmail)
  const [nameErrorMessage, setNameErrorMessage] = useState(null)
  const [assignmentTextErrorMessage, setAssignmentTextErrorMessage] = useState(null)
  const [creatorNameErrorMessage, setCreatorNameErrorMessage] = useState(null)
  const [creatorEmailErrorMessage, setCreatorEmailErrorMessage] = useState(null)
  const [dropDownErrorMessage, setDropDownErrorMessage] = useState(null)

  let id = task.id

  useEffect(() => {
    ruleService.getRules().then(response => {
      setRules(response)
    })
    categoryService.getCategories().then(response => {
      setCategories(response)
    })
    ageGroupService.getAgeGroups().then(response => {
      setAgeGroups(response)
    })
    languageService.getLanguages().then(response => {
      setLanguages(response)
    })
  }, [])

  const handleRuleChange = (e) => {
    setRule(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  const handleAgeGroupChange = (e) => {
    setAgeGroup(e.target.value)
  }

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
  }

  const handleModifyTask = async (event) => {
    event.preventDefault()
    setNameErrorMessage(null)
    setAssignmentTextErrorMessage(null)
    setCreatorNameErrorMessage(null)
    setCreatorEmailErrorMessage(null)
    setDropDownErrorMessage(null)
    if (name.length < 1) {
      setNameErrorMessage('Nimi ei saa olla tyhjä')
    }
    if (assignmentText.length < 1) {
      setAssignmentTextErrorMessage('Tehtävänanto ei saa olla tyhjä')
    }
    if (creatorName.length < 1) {
      setCreatorNameErrorMessage('Lisääjän nimi ei saa olla tyhjä')
    }
    if (creatorEmail.length < 1) {
      setCreatorEmailErrorMessage('Lisääjän sähköposti ei saa olla tyhjä')
    }
    if (language === '' || rule === '' || ageGroup === '' || category === '') {
      setDropDownErrorMessage('Valitsethan arvon kaikkiin pudotuskenttiin')
    }
    if (name.length < 1 || assignmentText.length < 1 || creatorName.length < 1 || creatorEmail.length < 1
      || language === '' || rule === '' || ageGroup === '' || category === '') {
      return
    }
    try {
      const modifiedTask = await taskService.updateTask({
        name, rule, category, ageGroup,
        language, assignmentText, gradingScale,
        creatorName, creatorEmail, supervisorInstructions, id
      })
      setMessage('Tehtävä tallennettu!')
      setTask(modifiedTask)
      setTimeout(() => {
        setMessage(null)
        window.location.reload()
      }, 5000)
    } catch {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCancel = () => {
    setModifyVisible(false)
  }

  return (
    <div>
      <h2>Muokkaa tehtävää</h2>
      <Notification message={message} type="success" />
      <Notification message={errorMessage} type="error" />
      <form onSubmit={handleModifyTask} className="modify-form">
        <div>
          <Notification message={nameErrorMessage} type="error" />
          <input
            className="task-title"
            type="text"
            defaultValue={name}
            name="Name"
            placeholder="Tehtävän otsikko"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <Notification message={assignmentTextErrorMessage} type="error" />
          <textarea
            rows="3"
            cols="35"
            className=""
            type="text"
            defaultValue={assignmentText}
            name="AssignmentText"
            placeholder="Tehtävänanto"
            onChange={({ target }) => setAssignmentText(target.value)}
          />
        </div>
        <div>
          <textarea
            rows="3"
            cols="35"
            className=""
            type="text"
            defaultValue={gradingScale}
            name="GradingScale"
            placeholder="Arvostelu"
            onChange={({ target }) => setGradingScale(target.value)}
          />
        </div>
        <div>
          <textarea
            rows="3"
            cols="35"
            className=""
            type="text"
            defaultValue={supervisorInstructions}
            name="supervisorInstruction"
            placeholder="Rastimiehen ohje"
            onChange={({ target }) => setSupervisorInstructions(target.value)}
          />
        </div>
        <div>
          <Notification message={dropDownErrorMessage} type="error" />
          <select value={ageGroup} onChange={(e) => handleAgeGroupChange(e)}>
            <option value="">Valitse ikäluokka</option>
            {ageGroups.map(ageGroup => <option key={ageGroup.id} value={ageGroup.id}>{ageGroup.name}</option>)}
          </select>

          <select value={category} onChange={(e) => handleCategoryChange(e)}>
            <option value="">Valitse kategoria</option>
            {categories.map(category => <option key={category.id} value={category.id}>{category.category}</option>)}
          </select>
        </div>
        <div>
          <select value={rule} onChange={(e) => handleRuleChange(e)}>
            <option value="">Valitse säännöt</option>
            {rules.map(rule => <option key={rule.id} value={rule.id}>{rule.rules}</option>)}
          </select>
          <select value={language} onChange={(e) => handleLanguageChange(e)}>
            <option value="">Tehtävän kieli</option>
            {languages.map(language => <option key={language.id} value={language.id}>{language.language}</option>)}
          </select>
        </div>
        <div>
          <Notification message={creatorNameErrorMessage} type="error" />
          <input
            className=""
            type="text"
            defaultValue={creatorName}
            name="CreatorName"
            placeholder="Muokkaajan nimi"
            onChange={({ target }) => setCreatorName(target.value)}
          />
          <Notification message={creatorEmailErrorMessage} type="error" />
          <input
            className=""
            type="text"
            defaultValue={creatorEmail}
            name="CreatorEmail"
            placeholder="Muokkaajan sähköpostiosoite"
            onChange={({ target }) => setCreatorEmail(target.value)}
          />
        </div>
        <div>
          <button type="submit" className="save-task-button">Tallenna tehtävä</button>
          <button onClick={() => handleCancel()} className="return-button">Palaa</button>
        </div>
      </form>
    </div>
  )
}
export default ModifyTask