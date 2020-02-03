import React, { useState } from 'react'
import Notification from './Notification'
import ruleService from '../services/rule'

const Rule = () => {
  const [rules, setRules] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleRuleAdd = async (event) => {
    event.preventDefault()
    try {
      await ruleService.addRule({
        rules,
      })
      setRules('')
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="rule-form">
      <h2>Lisää sääntö</h2>
      <Notification message={errorMessage} />
      <form onSubmit={handleRuleAdd}>
        <div>
          <input
            className="rule"
            type="text"
            value={rules}
            name="Rules"
            placeholder="Sääntö"
            onChange={({ target }) => setRules(target.value)}
          />
        </div>
        <button type="submit" className="task-add-button">Lisää</button>
      </form>
    </div>
  )
}


export default Rule
