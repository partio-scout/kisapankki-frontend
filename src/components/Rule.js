import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import ruleService from '../services/rule'

const Rule = () => {
  const [newRuleName, setNewRuleName] = useState('')
  const [modifiedRuleName, setModifiedRuleName] = useState('')
  const [modifiedRuleId, setModifiedRuleId] = useState('')
  const [rules, setRules] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [modifyVisible, setModifyVisible] = useState(false)

  useEffect(() => {
    ruleService.getRules().then((response) => {
      setRules(response)
    })
  }, [])


  const handleRuleAdd = async (event) => {
    event.preventDefault()
    try {
      const addedRule = await ruleService.addRule({
        rules: newRuleName,
      })
      setNewRuleName('')
      setRules(rules.concat(addedRule))
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleRuleDelete = async (rule) => {
    try {
      await ruleService.deleteRule(rule.id)
      setRules(rules.filter(r => r.id !== rule.id))
    } catch (exeption) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleRuleModify = async (event) => {
    event.preventDefault()
    const modifiedRule = { id: modifiedRuleId, name: modifiedRuleName }
    try {
      await ruleService.editRule(modifiedRule)
      setModifyVisible(false)
      setRules(rules.map(rule => rule.id !== modifiedRule.id ? rule : modifiedRule))
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const hideWhenVisible = { display: modifyVisible ? 'none' : '' }
  const showWhenVisible = { display: modifyVisible ? '' : 'none' }

  const handleShowModify = (rule) => {
    setModifyVisible(true)
    setModifiedRuleId(rule.id)
    setModifiedRuleName(rule.name)
  }

  return (
    <div className="rule-form">
      <Notification message={errorMessage} type="error" />
      <form style={hideWhenVisible} onSubmit={handleRuleAdd}>
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
      </form>

      {rules.map((rule) => (
        <div style={hideWhenVisible} className="rule-list-item" key={rule.id}>
          <p>{rule.name}</p>
          <button style={hideWhenVisible} onClick={() => handleRuleDelete(rule)}>Poista</button>
          <button style={hideWhenVisible} onClick={() => handleShowModify(rule)}>Muokkaa</button>
        </div>))
      }
      <div style={showWhenVisible } className="rule-form-item">
        < form onSubmit={handleRuleModify} >
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

          <div>

          </div>
        </form>
        
      </div>


    </div>
  )
}


export default Rule
