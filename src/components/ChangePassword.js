import React, { useState } from 'react'
import Notification from './Notification'
import userService from '../services/user'

const ChangePassword = ({ setShowChangePassword, setMessage }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordAgain, setNewPasswordAgain] = useState('')

  const handleChangePassword = async (event) => {
    event.preventDefault()
    setErrorMessage(null)
    if (newPassword.length < 3) {
      setErrorMessage('Salasanassa pitää olla vähintään 3 kirjainta')
      return
    }
    if (newPassword !== newPasswordAgain) {
      setErrorMessage('Salasanat eivät täsmää')
      return
    }
    try {
      await userService.editUser({
        oldPassword, newPassword
      })
      setOldPassword('')
      setNewPassword('')
      setNewPasswordAgain('')
      setShowChangePassword(false)
      setMessage('Salasana vaihdettu!')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error && error.response.data.error === "incorrect password") {
        setErrorMessage('Vanha salasana ei täsmää')
      } else {
        setErrorMessage('Salasanan vaihtaminen epäonnistui')
      }
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="change-password-form">
      <h2>Vaihda salasana</h2>
      <Notification message={errorMessage} type="error" />
      <form onSubmit={handleChangePassword}>
        <div>
          <input
            className="old-password"
            type="password"
            value={oldPassword}
            placeholder="Vanha salasana"
            onChange={({ target }) => setOldPassword(target.value)}
          />
        </div>
        <div>
          <input
            className="new-password"
            type="password"
            value={newPassword}
            placeholder="Uusi salasana"
            onChange={({ target }) => setNewPassword(target.value)}
          />
        </div>
        <div>
          <input
            className="new-password-again"
            type="password"
            value={newPasswordAgain}
            placeholder="Uusi salasana uudelleen"
            onChange={({ target }) => setNewPasswordAgain(target.value)}
          />
        </div>
        <button type="submit" className="change-password-button">Tallenna</button>
        <button onClick={() => setShowChangePassword(false)} className="cancel-button">Peruuta</button>
      </form>
    </div>
  )
}

export default ChangePassword
