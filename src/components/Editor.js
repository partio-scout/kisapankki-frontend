import React, { useEffect, useState, useRef } from "react";
import { EditorState, Editor as DraftEditor, convertToRaw, RichUtils } from "draft-js";
import styled from "styled-components"
import Toolbar from "./containers/index"
import { stateToHTML } from "draft-js-export-html";

const EditorWrapper = styled.div`
min-width: 700px;
display: flex;
height: fit-content;
flex-direction: column;
margin-top: 3em;
`;

const EditorContainer = styled.div`
display: flex;
min-height: 9em;
border-radius: 0 0 3 px px;
background-color: #fff;
padding: 5pg;
font-size: 17px;
font-weight: 300;
box-shadow: 0px 0px 3px 1px rgba(15, 15, 15, 0.17)
`;

const Editor = ({ setText, placeHolder }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  let editor = useRef()


  useEffect(() => {
    setText(convertToRaw(editorState.getCurrentContent()))
    console.log(convertToRaw(editorState.getCurrentContent()))
  }, [editorState])

  const focus = () => {
    editor.focus()
  }

  const onChange = (editorState) => {
    setEditorState(editorState)
  }

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (newState) {
      onChange(newState)
      return 'handled'
    }
    return 'not handled'
  }

  const onUnderlineClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  }

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }

  const onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
  }


  /*return (
    <EditorWrapper>
      <Toolbar editorState={editorState} updateEditorState={setEditorState} />
      <EditorContainer onClick={focus}>
        <DraftEditor
          placeholder={placeHolder}
          editorState={editorState}
          onChange={setEditorState}
          ref={(element) => { editor = element }}
        />

      </EditorContainer>
    </EditorWrapper>
  );*/

  return (
    <EditorWrapper>
      <div>
        <button type="button" onClick={onUnderlineClick.bind(this)}>U</button>
        <button type="button" onClick={onBoldClick.bind(this)}><b>B</b></button>
        <button type="button" onClick={onItalicClick.bind(this)}><em>I</em></button>
      </div>
      <EditorContainer onClick={focus}>
        <DraftEditor
          editorState={editorState}
          placeHolder={placeHolder}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          ref={(element) => { editor = element }}
        />
      </EditorContainer>
    </EditorWrapper>

  )
}

export default Editor