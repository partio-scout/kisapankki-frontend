import React, { useState } from 'react'
import Notification from './Notification'
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
      {user &&
        <div>
          {!showEdit && !showChangePassword &&
          <div className="user-info">
            <Notification message={message} type="success" />
            <h2>Omat tiedot</h2>
            <div><b>Nimi: </b>{user.name}</div>
            <div><b>Käyttäjätunnus: </b>{user.username}</div>
            <button className="edit-user-button" onClick={() => editUser()}>Muokkaa</button>
            <button className="change-password-button" onClick={() => changePassword()}>Vaihda salasana</button>
          </div>
          }
          {showEdit && <EditUser setShowEdit={setShowEdit} user={user} setUser={setUser} setMessage={setMessage} />}
          {showChangePassword && <ChangePassword setShowChangePassword={setShowChangePassword} setMessage={setMessage} />}
        </div>
      }
    </div>
  )
}

export default User
