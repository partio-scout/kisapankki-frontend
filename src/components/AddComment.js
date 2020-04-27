import React, { useState, useEffect } from 'react'
import commentService from '../services/comment'
import Notification from './Notification'

const AddComment = ({ task, user }) => {
  const [comments, setComments] = useState([])
  const [pendingComments, setPendingComments] = useState([])
  const [pending, setPending] = useState("")
  const [nickname, setNickname] = useState("")
  const [content, setContent] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    commentService.getComments(task.id).then((response) => {
      setComments(response)

    })
  }, [])



  const handleAddComment = async (event) => {
    event.preventDefault()
    try {

      const addedComment = await commentService.addComment({
        content: content,
        nickname: nickname,
        task: task.id,
        pending: pending
      })
      if (user) {
      } else {
      }
      setNickname('')
      setContent('')
      if (addedComment.pending == false) {
        setComments(comments.concat(addedComment))
      } else {
        setPendingComments(pendingComments.concat(addedComment))
      }
    } catch (exception) {
      setErrorMessage('Kommentin lisääminen ei onnistunut')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }



  return (
    <div>
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
