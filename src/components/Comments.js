import React, { useState, useEffect } from 'react'
import commentService from '../services/comments'

const Comments = () => {
  const [comments, setComments] = useState("")
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    commentService.getComments().then((response) => {
      setComments(response)
    })
  }, [])

  return (
    <div>
      {comments.map((comment) => (
        <p>{comment.content}</p>

      ))}


    </div>

  )
}
export default Comments