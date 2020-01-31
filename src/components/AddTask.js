import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import addtaskService from '../services/addtask'
import ruleService from '../services/rule'


const AddTask = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const [name, setName] = useState('')
    const [assignmentText, setAssignmentText] = useState('')
    const [gradingScale, setGradingScale] = useState('')
    const [supervisorInstructions, setSupervisorInstructions] = useState('')
    const [rules, setRules] = useState([])
    const [rule, setRule] = useState('')


    useEffect(() => {
        
        ruleService.getRules().then(response => {
            setRules(response)
        })
    },[])

    const handleRuleChange = (e) => {
        console.log(e.target.value)
        setRule(e.target.value)
    }



    const handleAddTask = async (event) => {
        event.preventDefault()
        try {
            const task = await addtaskService.addtask({
                name, rule
            })
            setName('')
            setRules('')
        } catch {
            setErrorMessage('Jotain meni vikaan')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <h2>Lisää tehtävä</h2>
            <Notification message={errorMessage} />
            <form onSubmit={handleAddTask}>
                <div>
                    <input
                        className=""
                        type="text"
                        value={name}
                        name="Name"
                        placeholder="Tehtävän otsikko"
                        onChange={({ target }) => setName(target.value)}
                    />

                </div>
                <div>
                    <textarea
                        rows="4"
                        cols="50"
                        className=""
                        type="text"
                        value={assignmentText}
                        name="AssignmentText"
                        placeholder="Tehtävänanto"
                        onChange={({ target }) => setAssignmentText(target.value)}
                    />


                </div>
                <div>
                    <textarea
                        rows="4"
                        cols="50"
                        className=""
                        type="text"
                        value={gradingScale}
                        name="GradingScale"
                        placeholder="Arvostelu asteikko"
                        onChange={({ target }) => setGradingScale(target.value)}
                    />
                </div>
                <div>
                    <textarea
                        rows="4"
                        cols="50"
                        className=""
                        type="text"
                        value={supervisorInstructions}
                        name="supervisiorInstruction"
                        placeholder="Ohjeet"
                        onChange={({ target }) => setSupervisorInstructions(target.value)}
                    />
                </div>
                <div>
                    <select onChange={(e)=>handleRuleChange(e)}>
                        <option value='' />
                        {rules.map((rule) =>
                        <option key={rule.id} value={rule.id}>{rule.rules}</option>)}
                    </select>
                </div>
                <div>
                    <select>
                        <option value="0"></option>
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                    </select>
                </div>
                <div>
                    <select>
                        <option value="0"></option>
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                    </select>
                </div>
                <div>
                    <select>
                        <option value="0"></option>
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                    </select>
                </div>
                <div>
                    <select>
                        <option value="0"></option>
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                    </select>
                </div>
                <button type="submit" className="signup-button">Lisää tehtävä</button>
            </form>
        </div>
    )
}
export default AddTask