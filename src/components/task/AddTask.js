import React, { useState, Fragment } from 'react'
import Notification from '../misc/Notification'
import taskService from '../../services/task'
import fileService from '../../services/file'
import MDEditor from '../misc/MDEditor'
import Dropzone from 'react-dropzone'

const AddTask = ({ user, addTask, rules, seriess, languages }) => {

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [name, setName] = useState('')
  const [assignmentText, setAssignmentText] = useState('')
  const [gradingScale, setGradingScale] = useState('')
  const [supervisorInstructions, setSupervisorInstructions] = useState('')
  const [assignmentTextMD, setAssignmentTextMD] = useState('')
  const [gradingScaleMD, setGradingScaleMD] = useState('')
  const [supervisorInstructionsMD, setSupervisorInstructionsMD] = useState('')
  const [rule, setRule] = useState('')
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [series, setSeries] = useState([])
  const [language, setLanguage] = useState('')
  const [creatorName, setCreatorName] = useState('')
  const [creatorEmail, setCreatorEmail] = useState('')
  const [nameErrorMessage, setNameErrorMessage] = useState(null)
  const [assignmentTextErrorMessage, setAssignmentTextErrorMessage] = useState(null)
  const [creatorNameErrorMessage, setCreatorNameErrorMessage] = useState(null)
  const [creatorEmailErrorMessage, setCreatorEmailErrorMessage] = useState(null)
  const [dropDownErrorMessage, setDropDownErrorMessage] = useState(null)
  const [files, setFiles] = useState([])
  const [fileNames, setFileNames] = useState({})
  const [showChangeFileName, setShowChangeFileName] = useState(false)
  const [nameToChange, setNameToChange] = useState('')
  const [changedFileName, setChangedFileName] = useState('')
  const [changedFileExtension, setChangedFileExtension] = useState('')
  const [editor, setEditor] = useState(0)

  const handleRuleChange = (e) => {
    setRule(e.target.value)
    setCategory('')
    if (e.target.value) {
      const foundRule = rules.find(r => r.id === e.target.value)
      setCategories(foundRule.acceptedCategories)
    } else {
      setCategories([])
    }
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
          formData.append('filesToAdd', files[i], fileNames[files[i].name])
      }
    }

    let addedFiles = []

    try {
      addedFiles = await fileService.updateFiles(formData)
      const task = await taskService.addtask({
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
      setFiles([])
      setFileNames({})
      setEditor(editor + 1)
      if (user) {
        addTask(task)
      }
      window.scrollTo({ top: 0, behavior: 'smooth'})
      setMessage('Tehtävä lisätty!')
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const onDrop = (newFiles) => {
    let newFilesArray = []
    let newNames = {}
    for (let i = 0; i < newFiles.length; i++) {
      let found = false
      for (let j = 0; j < files.length; j++) {
        if (files[j].name === newFiles[i].name) {
          found = true
        }
      }
      if (!found) {
        newFilesArray.push(newFiles[i])
        newNames[newFiles[i].name] = newFiles[i].name
      }
    }
    setFiles(files.concat(newFilesArray))
    setFileNames({ ...fileNames, ...newNames })
  }

  const handleDeleteFile = (e, name) => {
    e.stopPropagation()
    setFiles(files.filter(file => file.name !== name))
  }

  const handleChangeFileName = (e, name) => {
    e.stopPropagation()
    setShowChangeFileName(true)
    setNameToChange(name)
    setChangedFileName(name.substring(0, name.lastIndexOf('.')))
    setChangedFileExtension(name.substring(name.lastIndexOf('.')))
  }

  const handleSaveFileName = (e, name) => {
    e.preventDefault()
    e.stopPropagation()
    setFileNames({ ...fileNames, [name]: changedFileName + changedFileExtension })
    setShowChangeFileName(false)
    setNameToChange('')
    setChangedFileName('')
    setChangedFileExtension('')
  }

  const handleCancelChangeFileName = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowChangeFileName(false)
    setNameToChange('')
    setChangedFileName('')
    setChangedFileExtension('')
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
          <MDEditor setText={setAssignmentText} setMD={setAssignmentTextMD} key={editor + 1} />
        </div>
        <div>
          <h4>Arvostelu</h4>
          <MDEditor setText={setGradingScale} setMD={setGradingScaleMD} key={editor + 2} />
        </div>
        <div className="instructions">
          <h4>Rastimiehen ohje</h4>
          <MDEditor setText={setSupervisorInstructions} setMD={setSupervisorInstructionsMD} key={editor + 3} />
        </div>
        <Notification message={dropDownErrorMessage} type="error" />
        <div className="dropdowns">
          <div>
            <h4 className="series-mobile">Sarja</h4>
            <select multiple value={series} onChange={(e) => handleSeriesChange(e)} className="multiple-series">
              <option value="" className="series-info">Sarja (paina Ctrl, jos useita)</option>
              {seriess.map(series => <option key={series.id} value={series.id}>{series.name}</option>)}
            </select>
          </div>
          <div>
            <select className="rule-select" value={rule} onChange={(e) => handleRuleChange(e)}>
              <option value="">Säännöt</option>
              {rules.map(rule => <option className="rule-options" key={rule.id} value={rule.id}>{rule.name}</option>)}
            </select>
            <br/>
            <select className="category-select" value={category} onChange={(e) => handleCategoryChange(e)}>
              <option value="">Kategoria</option>
              {categories.map(category => <option className="category-options" key={category.id} value={category.id}>{category.name}</option>)}
            </select>
            <br/>
            <select className="language-select" value={language} onChange={(e) => handleLanguageChange(e)}>
              <option value="">Kieli</option>
              {languages.map(language => <option className="language-options" key={language.id} value={language.id}>{language.name}</option>)}
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
              placeholder="Lisääjän sähköposti"
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
                {files.length > 0 &&
                  <React.Fragment>
                    {files.map((file) => (
                      <div key={file.name}>
                        {showChangeFileName && file.name === nameToChange ?
                          <div>
                            <input
                              className=""
                              type="text"
                              value={changedFileName}
                              name="ChangedFileName"
                              onChange={({ target }) => setChangedFileName(target.value)}
                              onClick={e => e.stopPropagation()}
                            />
                            {changedFileExtension}
                            <div className="button-container">
                              <button onClick={(e) => handleSaveFileName(e, file.name)}>Tallenna</button>
                              <button onClick={(e) => handleCancelChangeFileName(e)}>Peruuta</button>
                            </div>
                          </div>
                          :
                          <Fragment>
                            {fileNames[file.name]}
                            <span onClick={(e) => handleChangeFileName(e, file.name)}className="edit-file" />
                            <span onClick={(e) => handleDeleteFile(e, file.name)}className="remove-file" />
                          </Fragment>
                        }
                      </div>
                    ))}
                  </React.Fragment>
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