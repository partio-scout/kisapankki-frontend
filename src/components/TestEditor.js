import React, { useState, useRef } from 'react'
import Editor from 'draft-js-plugins-editor'
import { EditorState } from 'draft-js'
import createToolbarPlugin from 'draft-js-static-toolbar-plugin'
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
} from 'draft-js-buttons'

const TestEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  let editor = useRef(null)

  const onChange = (editorState) => {
    setEditorState(editorState)
  }

  const focus = () => {
    editor.focus()
  }

  const toolbarPlugin = createToolbarPlugin()

  const { Toolbar } = toolbarPlugin
  let plugins = [toolbarPlugin]

  return (
    <div onClick={focus}>
      <h1>Hello world</h1>
      <Toolbar />
      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        ref={(element) => { editor = element }}
      />
    </div>
  )
}

export default TestEditor