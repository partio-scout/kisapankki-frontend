import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import addtaskService from '../services/task'
import ruleService from '../services/rule'
import categoryService from '../services/category'
import seriesService from '../services/series'
import languageService from '../services/language'


const AddTask = () => {

    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [name, setName] = useState('')
    const [assignmentText, setAssignmentText] = useState('')
    const [gradingScale, setGradingScale] = useState('')
    const [supervisorInstructions, setSupervisorInstructions] = useState('')
    const [rules, setRules] = useState([])
    const [rule, setRule] = useState('')
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const [seriess, setSeriess] = useState([])
    const [series, setSeries] = useState([])
    const [languages, setLanguages] = useState([])
    const [language, setLanguage] = useState('')
    const [creatorName, setCreatorName] = useState('')
    const [creatorEmail, setCreatorEmail] = useState('')
    const [nameErrorMessage, setNameErrorMessage] = useState(null)
    const [assignmentTextErrorMessage, setAssignmentTextErrorMessage] = useState(null)
    const [creatorNameErrorMessage, setCreatorNameErrorMessage] = useState(null)
    const [creatorEmailErrorMessage, setCreatorEmailErrorMessage] = useState(null)
    const [dropDownErrorMessage, setDropDownErrorMessage] = useState(null)

    useEffect(() => {
        ruleService.getRules().then(response => {
            setRules(response)
        })
        categoryService.getCategories().then(response => {
            setCategories(response)
        })
        seriesService.getSeries().then(response => {
            setSeriess(response)
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

    const handleSeriesChange = (e) => {
        let options = e.target.options
        let values = []
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected && options[i].value !== '') {
                values.push(options[i].value)
            }
        }
        setSeries(values)
    }

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value)
    }

    const handleAddTask = async (event) => {
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
        if (language === '' || rule === '' || series === '' || category === '') {
            setDropDownErrorMessage('Valitsethan arvon kaikkiin pudotuskenttiin')
        }
        if (name.length < 1 || assignmentText.length < 1 || creatorName.length < 1 || creatorEmail.length < 1
            || language === '' || rule === '' || series === '' || category === '') {
            return
        }
        try {
            await addtaskService.addtask({
                name, rule, category, series,
                language, assignmentText, gradingScale,
                creatorName, creatorEmail, supervisorInstructions
            })
            setName('')
            setRule('')
            setCategory('')
            setSeries('')
            setLanguage('')
            setAssignmentText('')
            setGradingScale('')
            setCreatorEmail('')
            setCreatorName('')
            setSupervisorInstructions('')
            setMessage('Tehtävä lisätty!')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
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
            <Notification message={message} type="success" />
            <Notification message={errorMessage} type="error" />
            <form onSubmit={handleAddTask}>
                <div>
                    <Notification message={nameErrorMessage} type="error" />
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
                    <Notification message={assignmentTextErrorMessage} type="error" />
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
                        value={supervisorInstructions}
                        name="supervisorInstruction"
                        placeholder="Rastimiehen ohje"
                        onChange={({ target }) => setSupervisorInstructions(target.value)}
                    />
                </div>
                <Notification message={dropDownErrorMessage} type="error" />
                <div className="dropdowns">
                    <select multiple value={series} onChange={(e) => handleSeriesChange(e)} className="multiple-series">
                        <option value="" className="series-info">Sarja (paina Ctrl, jos useita)</option>
                        {seriess.map(series => <option key={series.id} value={series.id}>{series.name}</option>)}
                    </select>
                </div>
                <div className="dropdowns">
                    <div>
                        <select value={category} onChange={(e) => handleCategoryChange(e)}>
                            <option value="">Kategoria</option>
                            {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <select value={rule} onChange={(e) => handleRuleChange(e)}>
                            <option value="">Säännöt</option>
                            {rules.map(rule => <option key={rule.id} value={rule.id}>{rule.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <select value={language} onChange={(e) => handleLanguageChange(e)}>
                            <option value="">Kieli</option>
                            {languages.map(language => <option key={language.id} value={language.id}>{language.name}</option>)}
                        </select>
                    </div>
                </div>
                <div>
                    <Notification message={creatorNameErrorMessage} type="error" />
                    <input
                        className=""
                        type="text"
                        value={creatorName}
                        name="CreatorName"
                        placeholder="Lisääjän nimi"
                        onChange={({ target }) => setCreatorName(target.value)}
                    />
                    <Notification message={creatorEmailErrorMessage} type="error" />
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