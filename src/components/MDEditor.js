import React from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

const MDEditor = ({ setText, placeHolder }) => {
  const mdParser = new MarkdownIt()

  const handleEditorChange = ({ html, text }) => {
    setText(html)
    console.log('handler', html, text)
  }

  return (
    <MdEditor
      value={placeHolder}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
    />
  )
}

export default MDEditor



