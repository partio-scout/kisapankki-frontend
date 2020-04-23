import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import commentService from '../services/comment'
import Notification from './Notification'
import tokenService from '../services/token'

const CommentListPending = () => {
  const [comments, setComments] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    if (!tokenService.getToken()) {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
        const loggedUser = JSON.parse(loggedUserJSON)
        tokenService.setToken(loggedUser.token)
      }
    }
    taskService.getPendingComments().then((response) => {
      setComments(response)
    })
  }, [])


  return (

    <div className="task-list">
      <h1>Hyväksyntää odottavat kommentit</h1>
      <Notification message={message} type="success" />
      <Notification message={errorMessage} type="error" />

    </div>

  )
}




export default CommentListPending
