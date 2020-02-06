import React, { useState } from 'react'

const Task = ({ task }) => {
  return (
    <div>
      {task.name}
      {task.id}
      
    </div>
  )
}


export default Task