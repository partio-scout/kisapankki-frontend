import React, { useState, useEffect } from 'react'
import commentService from '../services/comment'
import Notification from './Notification'

const Comment = ({ task }) => {
  const [comments, setComments] = useState([])
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
      if (window.confirm(`Haluatko poistaa kommentin: ${comment.content}`)) {
        await commentService.deleteComment(comment.id)
        setComments(comments.filter(c => c.id !== comment.id))
      }
    } catch (exeption) {
      setErrorMessage('Kommentin poistaminen ei onnistunut')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }

  return (
    <div>
      <Notification message={errorMessage} type="error" />
      {console.log(comments)}
      {comments.map((comment) => (
        <div className="comment-container">
          <div>
            <p className="user-left">{comment.content}</p>
          </div>
          <div className="user-right" >
            <div className="user" />
          </div>
          <button onClick={() => handleCommentDelete(comment)} className="add-task-button">Poista</button>
        </div>
      ))}

      <form onSubmit={handleAddComment}>
        <input
          className=""
          type="text"
          value={nickname}
          name="nickname"
          placeholder="Nimimerkki"
          onChange={({ target }) => setNickname(target.value)}
        />
        <input
          className=""
          type="text"
          value={content}
          name="content"
          placeholder="Kommentti"
          onChange={({ target }) => setContent(target.value)}
        />
        <button type="submit" className="add-task-button">Lisää kommentti</button>
      </form>

    </div>


  )
}
export default Comment
