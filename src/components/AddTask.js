import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import taskService from '../services/task'
import fileService from '../services/file'
import ruleService from '../services/rule'
import categoryService from '../services/category'
import seriesService from '../services/series'
import languageService from '../services/language'
import MDEditor from './MDEditor'
import Dropzone from 'react-dropzone'

const AddTask = () => {

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [name, setName] = useState('')
  const [assignmentText, setAssignmentText] = useState('')
  const [gradingScale, setGradingScale] = useState('')
  const [supervisorInstructions, setSupervisorInstructions] = useState('')
  const [assignmentTextMD, setAssignmentTextMD] = useState('')
  const [gradingScaleMD, setGradingScaleMD] = useState('')
  const [supervisorInstructionsMD, setSupervisorInstructionsMD] = useState('')
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
  const [files, setFiles] = useState([])

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
    setAssignmentText(JSON.stringify(assignmentText))
    setGradingScale(JSON.stringify(gradingScale))
    setSupervisorInstructions(JSON.stringify(supervisorInstructions))

    let formData = new FormData()

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
          formData.append('files', files[i], files[i].name)
      }
    }

    try {
      const addedFiles = await fileService.addFiles(formData)
      console.log(addedFiles)
      await taskService.addtask({
        name, rule, category, series,
        language, assignmentText, gradingScale,
        creatorName, creatorEmail, supervisorInstructions,
        assignmentTextMD, gradingScaleMD, supervisorInstructionsMD,
        files: addedFiles
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
        window.location.reload()
      }, 2000)
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const onDrop = (newFiles) => {
    setFiles(files.concat(newFiles))
  }

  const handleDeleteFile = (e, name) => {
    e.stopPropagation()
    setFiles(files.filter(file => file.name !== name))
  }

  return (
    <div className="add-task-container">
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
            placeholder="Tehtävän nimi"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <h4>Tehtävänanto</h4>
          <Notification message={assignmentTextErrorMessage} type="error" />
          <MDEditor setText={setAssignmentText} setMD={setAssignmentTextMD} />
        </div>
        <div>
          <h4>Arvostelu</h4>
          <MDEditor setText={setGradingScale} setMD={setGradingScaleMD} />
        </div>
        <div className="instructions">
          <h4>Rastimiehen ohje</h4>
          <MDEditor setText={setSupervisorInstructions} setMD={setSupervisorInstructionsMD} />
        </div>
        <Notification message={dropDownErrorMessage} type="error" />
        <div className="dropdowns">
          <div>
            <select multiple value={series} onChange={(e) => handleSeriesChange(e)} className="multiple-series">
              <option value="" className="series-info">Sarja (paina Ctrl, jos useita)</option>
              {seriess.map(series => <option key={series.id} value={series.id}>{series.name}</option>)}
            </select>
          </div>
          <div>
            <select value={category} onChange={(e) => handleCategoryChange(e)}>
              <option value="">Kategoria</option>
              {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
            <br/>
            <select value={rule} onChange={(e) => handleRuleChange(e)}>
              <option value="">Säännöt</option>
              {rules.map(rule => <option key={rule.id} value={rule.id}>{rule.name}</option>)}
            </select>
            <br/>
            <select value={language} onChange={(e) => handleLanguageChange(e)}>
              <option value="">Kieli</option>
              {languages.map(language => <option key={language.id} value={language.id}>{language.name}</option>)}
            </select>
          </div>
        </div>
        <div className="creator">
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
          </div>
          <div>
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
        </div>

        <Dropzone onDrop={onDrop}>
          {({getRootProps, getInputProps}) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="files">
                <span>Liitetiedostot</span>
                {files.length > 0 &&
                  <div>
                    {files.map((file) => (
                      <span key={file.name}>{file.name}<b onClick={(e) => handleDeleteFile(e, file.name)}>x</b></span>
                    ))}
                  </div>
                }
              </div>
            </div>
          )}
        </Dropzone>

        <button type="submit" className="add-task-button">Lisää tehtävä</button>
      </form>
    </div>
  )
}
export default AddTask