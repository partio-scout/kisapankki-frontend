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

const ModifyTask = ({ setModifyVisible, task, setTask }) => {

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [name, setName] = useState(task.name)
  const [assignmentText, setAssignmentText] = useState(task.assignmentText)
  const [gradingScale, setGradingScale] = useState(task.gradingScale)
  const [supervisorInstructions, setSupervisorInstructions] = useState(task.supervisorInstructions)
  const [assignmentTextMD, setAssignmentTextMD] = useState(task.assignmentTextMD)
  const [gradingScaleMD, setGradingScaleMD] = useState(task.gradingScaleMD)
  const [supervisorInstructionsMD, setSupervisorInstructionsMD] = useState(task.supervisorInstructionsMD)
  const [rules, setRules] = useState([])
  const [rule, setRule] = useState(task.rules ? task.rules.id : null)
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(task.category ? task.category.id : null)
  const [seriess, setSeriess] = useState([])
  const [series, setSeries] = useState(task.series.map(s => s.id))
  const [languages, setLanguages] = useState([])
  const [language, setLanguage] = useState(task.language ? task.language.id : null)
  const [creatorName, setCreatorName] = useState(task.creatorName)
  const [creatorEmail, setCreatorEmail] = useState(task.creatorEmail)
  const [nameErrorMessage, setNameErrorMessage] = useState(null)
  const [assignmentTextErrorMessage, setAssignmentTextErrorMessage] = useState(null)
  const [creatorNameErrorMessage, setCreatorNameErrorMessage] = useState(null)
  const [creatorEmailErrorMessage, setCreatorEmailErrorMessage] = useState(null)
  const [dropDownErrorMessage, setDropDownErrorMessage] = useState(null)
  const [oldFiles, setOldFiles] = useState(task.files || [])
  const [newFiles, setNewFiles] = useState([])
  const [filesToDelete, setFilesToDelete] = useState([])

  let id = task.id

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
    if (language === '' || rule === '' || series === '' || category === '') {
      setDropDownErrorMessage('Valitsethan arvon kaikkiin pudotuskenttiin')
    }
    if (name.length < 1 || assignmentText.length < 1 || creatorName.length < 1 || creatorEmail.length < 1
      || language === '' || rule === '' || series === '' || category === '') {
      return
    }

    let formData = new FormData()

    formData.append('filesToDelete', filesToDelete)

    if (newFiles.length > 0) {
      for (let i = 0; i < newFiles.length; i++) {
          formData.append('filesToAdd', newFiles[i], newFiles[i].name)
      }
    }

    let addedFiles = []

    try {
      addedFiles = await fileService.updateFiles(formData)
      const modifiedTask = await taskService.updateTask({
        name, rule, category, series,
        language, assignmentText, gradingScale,
        creatorName, creatorEmail, supervisorInstructions, id,
        assignmentTextMD, gradingScaleMD, supervisorInstructionsMD,
        files: oldFiles.concat(addedFiles)
      })
      console.log(modifiedTask)
      setMessage('Tehtävä tallennettu!')
      setTask(modifiedTask)
      setTimeout(() => {
        setMessage(null)
        window.location.reload()
      }, 1000)
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCancel = () => {
    setModifyVisible(false)
  }

  const onDrop = (files) => {
    setNewFiles(newFiles.concat(files))
  }

  const handleDeleteOldFile = (e, name) => {
    e.stopPropagation()
    setOldFiles(oldFiles.filter(file => file !== name))
    setFilesToDelete(filesToDelete.concat(name))
  }

  const handleDeleteNewFile = (e, name) => {
    e.stopPropagation()
    setNewFiles(newFiles.filter(file => file.name !== name))
  }

  return (
    <div className="modify-task-container">
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
            placeholder="Tehtävän nimi"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <h4>Tehtävänanto</h4>
          <Notification message={assignmentTextErrorMessage} type="error" />
          <MDEditor setText={setAssignmentText} setMD={setAssignmentTextMD} value={assignmentTextMD} placeHolder="Tehtävänanto" />
        </div>
        <div>
          <h4>Arvostelu</h4>
          <MDEditor setText={setGradingScale} setMD={setGradingScaleMD} value={gradingScaleMD} placeHolder="Arvostelu" />
        </div>
        <div className="instructions">
          <h4>Rastimiehen ohje</h4>
          <MDEditor setText={setSupervisorInstructions} setMD={setSupervisorInstructionsMD} value={supervisorInstructionsMD} placeHolder="Rastimiehen ohje" />
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
              defaultValue={creatorName}
              name="CreatorName"
              placeholder="Muokkaajan nimi"
              onChange={({ target }) => setCreatorName(target.value)}
            />
          </div>
          <div>
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
        </div>

        <Dropzone onDrop={onDrop}>
          {({getRootProps, getInputProps}) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="files">
                <div className="title">Liitetiedostot</div>
                {oldFiles && oldFiles.length > 0 &&
                  <React.Fragment>
                    {oldFiles.map((file) => (
                      <div key={file}>{file.substring(file.indexOf('-') + 1, file.length)}<b onClick={(e) => handleDeleteOldFile(e, file)}>x</b></div>
                    ))}
                  </React.Fragment>
                }
                {newFiles && newFiles.length > 0 &&
                  <React.Fragment>
                    {newFiles.map((file) => (
                      <div key={file.name}>{file.name}<b onClick={(e) => handleDeleteNewFile(e, file.name)}>x</b></div>
                    ))}
                  </React.Fragment>
                }
              </div>
            </div>
          )}
        </Dropzone>

        <div>
          <button type="submit" className="save-task-button">Tallenna</button>
          <button onClick={() => handleCancel()} className="return-button">Peruuta</button>
        </div>
      </form>
    </div>
  )
}
export default ModifyTask