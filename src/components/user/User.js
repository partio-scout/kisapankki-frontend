import React, { useState } from 'react'
import Notification from '../misc/Notification'
import EditUser from './EditUser'
import ChangePassword from './ChangePassword'

const User = ({ user, setUser }) => {
  const [message, setMessage] = useState(null)
  const [showEdit, setShowEdit] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)

  const editUser = () => {
    setShowChangePassword(false)
    setShowEdit(true)
  }


  const changePassword = () => {
    setShowEdit(false)
    setShowChangePassword(true)
  }

  return (
    <div>
      {user
        && (
          <div className="user-info">
            {!showEdit && !showChangePassword
              && (
                <div>
                  <Notification message={message} type="success" />
                  <h2>Omat tiedot</h2>
                  <p>
                    <b>Nimi: </b>
                    {user.name}
                  </p>
                  <p>
                    <b>Käyttäjätunnus: </b>
                    {user.username}
                  </p>
                  <p>
                    <b>Sähköpostiosoite: </b>
                    {user.email}
                  </p>
                  <p>
                    <b>Ilmoitukset: </b>
                    {user.allowNotifications ?
                      <span>Päällä</span>
                      :
                      <span>Pois päältä</span>
                    }
                  </p>
                  <button className="edit-user-button" onClick={() => editUser()}>Muokkaa</button>
                  <button className="change-password-button" onClick={() => changePassword()}>Vaihda salasana</button>
                </div>
              )}
            {showEdit && <EditUser setShowEdit={setShowEdit} user={user} setUser={setUser} setMessage={setMessage} />}
            {showChangePassword && <ChangePassword setShowChangePassword={setShowChangePassword} setMessage={setMessage} />}
          </div>
        )}
    </div>
  )
}

export default User
