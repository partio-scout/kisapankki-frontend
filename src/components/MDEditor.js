import React from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

const MDEditor = ({ setText, setMD, value }) => {
  const mdParser = new MarkdownIt()

  const handleEditorChange = ({ html, text }) => {
    setText(html)
    setMD(text)
  }

  return (
    <MdEditor
      value={value}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
    />
  )
}

export default MDEditor



