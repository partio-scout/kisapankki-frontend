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
    commentService.getPendingComments().then((response) => {
      setComments(response)
    })
  }, [])

  const handleCommentDelete = async (comment) => {
    try {
      await commentService.deleteComment(comment.id)
      setComments(comments.filter(c => c.id !== comment.id))
    } catch (exeption) {
      setErrorMessage('Kommentin poistaminen ei onnistunut')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }

  const handleCommentAccept = async (comment) => {
    try {
      await commentService.acceptComment(comment.id)
      setComments(comments.filter(c => c.id !== comment.id))
    } catch (exeption) {
      setErrorMessage('Kommentin hyväksyminen ei onnistunut')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }

  return (
    <div className="task-list">
      <h1>Hyväksyntää odottavat kommentit</h1>
      <Notification message={message} type="success" />
      <Notification message={errorMessage} type="error" />

      {comments && comments.length > 0 &&
        <div className="task-list-title">
          <span>Kommentti</span>
          <span></span>
          <span>Kommentoija</span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      }

      {comments.map((comment) => (
        <div className="no-underline" key={comment.id}>
          <div className="task-list-item">
            <span>{comment.content}</span>
            <span></span>
            <span>{comment.nickname}</span>
            <span><button className="accept-button" onClick={() => handleCommentAccept(comment)}>Hyväksy</button></span>
            <span><button className="delete-button" onClick={() => handleCommentDelete(comment)}>Poista</button></span>
            <span></span>
          </div>
        </div>
      ))}
    </div>

  )
}




export default CommentListPending