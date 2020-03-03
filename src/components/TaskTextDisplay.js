import React from 'react'

const TaskTextDisplay = ({ text }) => {
  const htmlConverter = () => {
    return { __html: `${text}` }
  }

  return (
    <div dangerouslySetInnerHTML={htmlConverter()} />
  )
}

export default TaskTextDisplay