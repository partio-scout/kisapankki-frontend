import React from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

const MDEditor = ({ setText, placeHolder, setMD, value }) => {
  const mdParser = new MarkdownIt()

  const handleEditorChange = ({ html, text }) => {
    setText(html)
    setMD(text)
    console.log('handler', html, text)
  }

  return (
    <MdEditor
      value={value}
      placeHolder={placeHolder}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
    />
  )
}

export default MDEditor



