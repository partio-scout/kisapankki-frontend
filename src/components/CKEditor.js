import React, { useState } from 'react'
import CKEditor from 'react-ckeditor-component'

const CKeditor = ({ setText, placeHolder, text }) => {
  const [content, setContent] = useState('content')

  const updateContent = (newContent) => {
    setContent(newContent)
  }

  const onChange = (e) => {
    console.log("onChange fired with event info: ", e)
    let newContent = e.editor.getData()
    updateContent(newContent)
    setText(e.editor.getData())
    console.log(newContent)
    console.log(content)
    console.log(text)
  }

  const onBlur = (e) => {
    console.log("onBlur event called with event info: ", e)
  }

  const afterPaste = (e) => {
    console.log("afterPaste event called with event info: ", e)
  }
  return (
    <CKEditor
      activeClass="p10"
      content={content}
      events={{
        "blur": onBlur,
        "afterPaste": afterPaste,
        "change": onChange
      }}
    />
  )
}

export default CKeditor