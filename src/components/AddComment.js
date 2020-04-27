import React, { useState, useEffect } from 'react'
import commentService from '../services/comment'
import Notification from './Notification'

const AddComment = ({ task, user, setComments, comments }) => {
  const [nickname, setNickname] = useState("")
  const [content, setContent] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  const handleAddComment = async (event) => {
    event.preventDefault()
    try {

      const addedComment = await commentService.addComment({
        content: content,
        nickname: nickname,
        task: task.id,
      })
      if (user) {
        setComments(comments.concat(addedComment))
      } 
      setMessage('Kommentin lisääminen onnistui')
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      setNickname('')
      setContent('')
    } catch (exception) {
      setErrorMessage('Kommentin lisääminen ei onnistunut')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }



  return (
    <div>
      <Notification message={message} type="success" />
      <Notification message={errorMessage} type="error" />
      <form onSubmit={handleAddComment}>
        <div>
          <input
            className=""
            type="text"
            value={nickname}
            name="nickname"
            placeholder="Nimimerkki"
            onChange={({ target }) => setNickname(target.value)}
          />
        </div>
        <div>
          <textarea
            className="textarea"
            type="textarea"
            value={content}
            name="content"
            placeholder="Kommentti"
            onChange={({ target }) => setContent(target.value)}
            rows="5"
            cols="50"
          />
        </div>
        <button type="submit" className="add-task-button">Lisää kommentti</button>

      </form>

    </div>
  )

}

export default AddComment
