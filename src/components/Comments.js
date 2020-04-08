import React, { useState, useEffect } from 'react'
import commentService from '../services/comment'

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
     


    </div>

  )
}
export default Comments