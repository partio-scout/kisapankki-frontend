import React, { useState, useEffect } from 'react'
import commentService from '../services/comment'
import Notification from './Notification'

const Comment = ({ task }) => {
  const [comments, setComments] = useState([])
  const [pendingComments, setPendingComments] = useState([])
  const [nickname, setNickname] = useState("")
  const [content, setContent] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    commentService.getComments(task.id).then((response) => {
      setComments(response)

    })
  }, [])

  useEffect(() => {
    commentService.getPendingComments().then((response) => {
      setPendingComments(response)

    })
  }, [])

  const handleAddComment = async (event) => {
    event.preventDefault()
    try {

      const addedComment = await commentService.addComment({
        content: content,
        nickname: nickname,
        task: task.id
      })
      setNickname('')
      setContent('')
      setComments(comments.concat(addedComment))
    } catch (exception) {
      setErrorMessage('Kommentin lisääminen ei onnistunut')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
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
    <div>
      <Notification message={errorMessage} type="error" />
      {comments.map((comment) => (
        <div>
          <div className="comment-content">
            {comment.content}
          </div>
          <div>
            <div className="comment-container">
              <div>
                <div className="user" />
              </div>
              <div className="user-right" >
                <p className="user-left">{comment.nickname}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

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
            className=""
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
export default Comment
