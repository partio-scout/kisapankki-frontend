import React, { useState, useEffect } from 'react'
import commentService from '../services/comment'

const Comment = ({ task }) => {
  const [comments, setComments] = useState([])
  const [nickname, setNickname] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    commentService.getComments().then((response) => {
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
    }
  }

  return (
    <div>
      {comments.map(comment =>
        <li key={comments.id}>{comment.content}</li>)}

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
