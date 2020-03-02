import React from 'react'

const TaskTextDisplay = ({ text }) => {
  const evilConverter = () => {
    return { __html: `${text}` }
  }

  return (
    <div dangerouslySetInnerHTML={evilConverter()} />
  )
}

export default TaskTextDisplay