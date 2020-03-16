import React, { useState, useEffect } from 'react'
import { CirclePicker } from 'react-color'
import Notification from './Notification'
import seriesService from '../services/series'

const Series = () => {
  const [name, setName] = useState('')
  const [modifiedSerieName, setModifiedSerieName] = useState('')
  const [modifiedSerieId, setModifiedSerieId] = useState('')
  const [modifiedSerieColor, setModifiedSerieColor] = useState('')
  const [series, setSeries] = useState([])
  const [color, setColor] = useState('#ffffff')
  const [errorMessage, setErrorMessage] = useState(null)
  const [modifyVisible, setModifyVisible] = useState(false)

  useEffect(() => {
    seriesService.getSeries().then((response) => {
      setSeries(response)
    })
  }, [])

  const handleSeriesAdd = async (event) => {
    event.preventDefault()
    try {
      const addedSerie = await seriesService.addSeries({ name, color })
      setName('')
      setColor('')
      setSeries(series.concat(addedSerie))
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleSerieDelete = async (serie) => {
    try {
      if (window.confirm(`haluatko poistaa sarjan: ${serie.name}`)) {
        await seriesService.deleteSerie(serie.id)
        setSeries(series.filter(s => s.id !== serie.id))
      }
    } catch (exeption) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleSerieModify = async (event) => {
    event.preventDefault()
    const modifiedSerie = { id: modifiedSerieId, name: modifiedSerieName, color: modifiedSerieColor }
    try {
      await seriesService.editSerie(modifiedSerie)
      setModifyVisible(false)
      setSeries(series.map(serie => serie.id !== modifiedSerie.id ? serie : modifiedSerie))
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const hideWhenVisible = { display: modifyVisible ? 'none' : '' }
  const showWhenVisible = { display: modifyVisible ? '' : 'none' }

  const handleShowModify = (serie) => {
    console.log(serie.color)
    setModifyVisible(true)
    setModifiedSerieId(serie.id)
    setModifiedSerieName(serie.name)
    setModifiedSerieColor(serie.color)

  }


  return (
    <div className="series-form">
      <Notification message={errorMessage} type="error" />
      <form style={hideWhenVisible} onSubmit={handleSeriesAdd}>
        <div>
          <input
            className="name"
            type="text"
            value={name}
            name="Name"
            placeholder="Nimi"
            onChange={({ target }) => setName(target.value)}
          />
          <button type="submit" className="series-submit-button">Lisää</button>
        </div>
        <div className="color-picker">
          <CirclePicker
            color={color}
            onChangeComplete={color => setColor(color.hex)}
            colors={["#253764", "#28aae1", "#f04150", "#f0a01e", "#f0e105", "#14a54b",
              "#f5ea2e", "#d4791e", "#5e0f75", "#33652e", "#6e470a", "#607d8b"]}
          />
        </div>

      </form>
      {series.map((serie) => (
        <div style={hideWhenVisible} className="serie-list-item" key={serie.id}>{serie.name}

          <button style={hideWhenVisible} onClick={() => handleSerieDelete(serie)}>Poista</button>
          <button style={hideWhenVisible} onClick={() => handleShowModify(serie)}>Muokkaa</button>

        </div>))
      }
      <div style={showWhenVisible} className="serie-form-item">
        < form onSubmit={handleSerieModify} >
          <div>
            <input
              className="serie"
              type="text"
              value={modifiedSerieName}
              name="Serie"
              onChange={({ target }) => setModifiedSerieName(target.value)}
            />
            <div className="color-picker">
              <CirclePicker
                color={modifiedSerieColor}
                onChangeComplete={color => setModifiedSerieColor(color.hex)}
                colors={["#253764", "#28aae1", "#f04150", "#f0a01e", "#f0e105", "#14a54b",
                  "#f5ea2e", "#d4791e", "#5e0f75", "#33652e", "#6e470a", "#607d8b"]}
              />
            </div>
            <button type="submit" className="serie-save-button">Tallenna</button>
            <button onClick={() => setModifyVisible(false)}>Peruuta</button>
          </div>

          <div>

          </div>
        </form>

      </div>

    </div>
  )
}

export default Series
