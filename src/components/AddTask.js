import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import addtaskService from '../services/addtask'
import ruleService from '../services/rule'
import categoryService from '../services/category'
import ageGroupService from '../services/ageGroup'


const AddTask = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const [name, setName] = useState('')
    const [assignmentText, setAssignmentText] = useState('')
    const [gradingScale, setGradingScale] = useState('')
    const [supervisorInstructions, setSupervisorInstructions] = useState('')
    const [rules, setRules] = useState([])
    const [rule, setRule] = useState('')
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const [ageGroups, setAgeGroups] = useState([])
    const [ageGroup, setAgeGroup] = useState('')

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
    }, [])

    const handleRuleChange = (e) => {
        console.log(e.target.value)
        setRule(e.target.value)
    }

    const handleCategoryChange = (e) => {
        console.log(e.target.value)
        setCategory(e.target.value)
    }

    const handleAgeGroupChange = (e) => {
        console.log(e.target.value)
        setAgeGroup(e.target.value)
    }

    const handleAddTask = async (event) => {
        event.preventDefault()
        try {
            const task = await addtaskService.addtask({
                name, rule, category, ageGroup
            })
            setName('')
            setRules('')
            setCategory('')
            setAgeGroup('')
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
                    <select onChange={(e) => handleRuleChange(e)}>
                        <option value="">Valitse sääntöluokka</option>
                        {rules.map((rule) =>
                            <option key={rule.id} value={rule.id}>{rule.rules}</option>)}
                    </select>
                </div>
                <div>
                    <select onChange={(e) => handleCategoryChange(e)}>
                        <option value="">Valitse kategoria</option>
                        {categories.map((category) => <option key={category.id} value={category.id}>{category.category}</option>)}
                    </select>
                </div>
                <div>
                    <select onChange={(e) => handleAgeGroupChange(e)}>
                        <option value="">Valitse ikäluokka</option>
                        {ageGroups.map((ageGroup) => <option key={ageGroup.id} value={ageGroup.id}>{ageGroup.name}</option>)}
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
                <button type="submit" className="add-task-button">Lisää tehtävä</button>
            </form>
        </div>
    )
}
export default AddTask