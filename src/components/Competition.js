import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import Notification from './Notification'

const Competition = ({ name, date, place, type, logo, setName, setDate, setPlace, setType, setLogo }) => {

  const onDrop = (logo) => {
    setLogo(logo[0])
  }

  const handleDeleteLogo = (e) => {
    e.stopPropagation()
    setLogo(null)
  }

  return (
    <div>
      <h2 className="basket-title">Kisan tiedot</h2>

      <div className="competition">
        <input
          className="competition-name"
          type="text"
          value={name}
          name="Name"
          placeholder="Kisan nimi"
          onChange={({ target }) => setName(target.value)}
        />

        <input
          className="competition-date"
          type="text"
          value={date}
          name="Name"
          placeholder="Kisan päivämäärä"
          onChange={({ target }) => setDate(target.value)}
        />

        <input
          className="competition-place"
          type="text"
          value={place}
          name="Name"
          placeholder="Kisapaikka"
          onChange={({ target }) => setPlace(target.value)}
        />

        <input
          className="competition-type"
          type="text"
          value={type}
          name="Name"
          placeholder="Kisan laji"
          onChange={({ target }) => setType(target.value)}
        />
      </div>

      <Dropzone onDrop={onDrop}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="files">
              <div className="title">Logo</div>
              {logo && <div key={logo.name}>{logo.name}<span onClick={(e) => handleDeleteLogo(e)} className="remove-file" /></div>}
            </div>
          </div>
        )}
      </Dropzone>

    </div>

  )
}

export default Competition
