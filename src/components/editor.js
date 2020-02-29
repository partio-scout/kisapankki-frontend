import React, { useEffect, useState, useRef } from "react";
import { EditorState, Editor as DraftEditor, convertToRaw } from "draft-js";
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


  return (
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
  );
}

export default Editor