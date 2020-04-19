import React, { useState, useEffect } from 'react'
import commentService from '../services/comment'
import Notification from './Notification'

const AddComment = ({ task }) => {
    const [comments, setComments] = useState([])
    const [pendingComments, setPendingComments] =useState([])
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

export default AddComment
