import React, { useState, Fragment } from 'react'
import Notification from './Notification'
import ruleService from '../services/rule'
import Select from 'react-select'

const Rule = ({ rules, setRules, categories }) => {
  const [newRuleName, setNewRuleName] = useState('')
  const [modifiedRuleName, setModifiedRuleName] = useState('')
  const [modifiedRuleId, setModifiedRuleId] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [modifyVisible, setModifyVisible] = useState(false)
  const [acceptedCategories, setAcceptedCategories] = useState([])
  const [modifiedCategories, setModifiedCategories] = useState([])
  const [isClearable, setIsClearable] = useState(true)

  const handleRuleAdd = async (event) => {
    event.preventDefault()
    const newCategories = acceptedCategories
    try {
      const addedRule = await ruleService.addRule({
        rules: newRuleName, acceptedCategories: acceptedCategories.map(category => category.id)
      })
      setNewRuleName('')
      setAcceptedCategories([])
      setRules(rules.concat({ ...addedRule, acceptedCategories: newCategories }))
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleRuleDelete = async (rule) => {
    try {
      if (window.confirm(`Haluatko poistaa säännön: ${rule.name}`)) {
        await ruleService.deleteRule(rule.id)
        setRules(rules.filter(r => r.id !== rule.id))
      }
    } catch (exeption) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleRuleModify = async (event) => {
    event.preventDefault()
    const modifiedRule = { id: modifiedRuleId, name: modifiedRuleName, acceptedCategories: modifiedCategories }
    try {
      await ruleService.editRule({ id: modifiedRuleId, name: modifiedRuleName, acceptedCategories: modifiedCategories.map(category => category.id) })
      setModifyVisible(false)
      setRules(rules.map(rule => rule.id !== modifiedRule.id ? rule : modifiedRule))
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleShowModify = (rule) => {
    setModifyVisible(true)
    setModifiedRuleId(rule.id)
    setModifiedRuleName(rule.name)
    setModifiedCategories(rule.acceptedCategories)
  }

  const handleAddCategories = (categories) => {
    setAcceptedCategories(categories)
  }

  const handleModifyCategories = (categories) => {
    setModifiedCategories(categories)
  }

  return (
    <div className="rule-form">
      <Notification message={errorMessage} type="error" />

      {rules && rules.map((rule) => (
        <div className="rule-list-item" key={rule.id}>
          {modifyVisible && modifiedRuleId === rule.id ?
            <div className="rule-form-item">
              <form onSubmit={handleRuleModify}>
                <div>
                  <input
                    className="rule"
                    type="text"
                    value={modifiedRuleName}
                    name="Category"
                    onChange={({ target }) => setModifiedRuleName(target.value)}
                  />
                  <button type="submit" className="rule-save-button">Tallenna</button>
                  <button onClick={() => setModifyVisible(false)}>Peruuta</button>
                </div>
                <div className="modify-acceptedCategories">
                  <Select
                    name="accepted-categories"
                    value={modifiedCategories}
                    getOptionLabel={option => `${option.name}`}
                    getOptionValue={option => `${option.id}`}
                    onChange={handleModifyCategories}
                    options={categories}
                    isClearable={isClearable}
                    placeholder={"Säännön kategoriat"}
                    isMulti={true}
                  />
                </div>
              </form>
            </div>
          :
          <Fragment>
            <p>{rule.name}</p>
            <button onClick={() => handleShowModify(rule)} className="modify-button">Muokkaa</button>
            <button onClick={() => handleRuleDelete(rule)} className="delete-button">Poista</button>
            <div className="break"></div>
            <div className="accepted-categories-list">
              {rule.acceptedCategories && rule.acceptedCategories.map(category => (
                  <span key={category.id}>{category.name} </span>
                ))}
            </div>
          </Fragment>
          }
        </div>))
      }

      <form onSubmit={handleRuleAdd} className="add-form">
        <div>
          <input
            className="rule"
            type="text"
            value={newRuleName}
            name="Rules"
            placeholder="Uusi sääntö"
            onChange={({ target }) => setNewRuleName(target.value)}
          />
          <button type="submit" className="rule-add-button">Lisää</button>
        </div>

        <div className="add-acceptedCategories">
          <Select
            name="accepted-categories"
            value={acceptedCategories}
            getOptionLabel={option => `${option.name}`}
            getOptionValue={option => `${option.id}`}
            onChange={handleAddCategories}
            options={categories}
            isClearable={isClearable}
            placeholder={"Uuden säännön kategoriat"}
            isMulti={true}
          />
        </div>
      </form>

    </div>
  )
}


export default Rule
