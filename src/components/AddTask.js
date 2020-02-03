import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import addtaskService from '../services/task'
import ruleService from '../services/rule'
import categoryService from '../services/category'
import ageGroupService from '../services/ageGroup'
import languageService from '../services/language'


const AddTask = () => {

    const [message, setMessage] = useState('')
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
    const [languages, setLanguages] = useState([])
    const [language, setLanguage] = useState('')
    const [creatorName, setCreatorName] = useState('')
    const [creatorEmail, setCreatorEmail] = useState('')

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

    const handleAddTask = async (event) => {
        event.preventDefault()
        try {
            const task = await addtaskService.addtask({
                name, rule, category, ageGroup,
                language, assignmentText, gradingScale,
                creatorName, creatorEmail
            })
            setName('')
            setRule('')
            setCategory('')
            setAgeGroup('')
            setLanguage('')
            setAssignmentText('')
            setGradingScale('')
            setCreatorEmail('')
            setCreatorName('')
            setSupervisorInstructions('')
            setMessage('Tehtävä lisätty!')
        } catch {
            setMessage('Jotain meni vikaan')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <h2>Lisää tehtävä</h2>
            <Notification message={message} />
            <form onSubmit={handleAddTask}>
                <div>
                    <input
                        className="task-title"
                        type="text"
                        value={name}
                        name="Name"
                        placeholder="Tehtävän otsikko"
                        onChange={({ target }) => setName(target.value)}
                    />
                </div>
                <div>
                    <textarea
                        rows="3"
                        cols="35"
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
                        rows="3"
                        cols="35"
                        className=""
                        type="text"
                        value={gradingScale}
                        name="GradingScale"
                        placeholder="Arvosteluasteikko"
                        onChange={({ target }) => setGradingScale(target.value)}
                    />
                </div>
                <div>
                    <textarea
                        rows="3"
                        cols="35"
                        className=""
                        type="text"
                        value={supervisorInstructions}
                        name="supervisorInstruction"
                        placeholder="Ohjeet"
                        onChange={({ target }) => setSupervisorInstructions(target.value)}
                    />
                </div>
                <div>
                    <select value={rule} onChange={(e) => handleRuleChange(e)}>
                        <option value="">Valitse sääntöluokka</option>
                        {rules.map(rule => <option key={rule.id} value={rule.id}>{rule.rules}</option>)}
                    </select>
                    <select value={category} onChange={(e) => handleCategoryChange(e)}>
                        <option value="">Valitse kategoria</option>
                        {categories.map(category => <option key={category.id} value={category.id}>{category.category}</option>)}
                    </select>
                </div>
                <div>
                    <select value={ageGroup} onChange={(e) => handleAgeGroupChange(e)}>
                        <option value="">Valitse ikäluokka</option>
                        {ageGroups.map(ageGroup => <option key={ageGroup.id} value={ageGroup.id}>{ageGroup.name}</option>)}
                    </select>
                    <select value={language} onChange={(e) => handleLanguageChange(e)}>
                        <option value="">Tehtävän kieli</option>
                        {languages.map(language => <option key={language.id} value={language.id}>{language.language}</option>)}
                    </select>
                </div>
                <div>
                    <input
                        className=""
                        type="text"
                        value={creatorName}
                        name="CreatorName"
                        placeholder="Lisääjän nimi"
                        onChange={({ target }) => setCreatorName(target.value)}
                    />
                    <input
                        className=""
                        type="text"
                        value={creatorEmail}
                        name="CreatorEmail"
                        placeholder="Lisääjän sähköpostiosoite"
                        onChange={({ target }) => setCreatorEmail(target.value)}
                    />
                </div>
                <button type="submit" className="add-task-button">Lisää tehtävä</button>
            </form>
        </div>
    )
}
export default AddTask