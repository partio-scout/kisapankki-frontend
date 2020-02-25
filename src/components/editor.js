import React, { useState, useEffect } from "react";
import { EditorState, Editor as DraftEditor } from "draft-js";
import styled from "styled-components"
import Toolbar from "./containers/index"

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

const Editor = () => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  );

  const [placeHolder, setPlaceHolder] = useState("Click")

  return  (
    <EditorWrapper>
      <Toolbar editorState={editorState} updateEditorState={setEditorState} />
      <EditorContainer>
        <DraftEditor
          placeholder={placeHolder}
          editorState={editorState}
          onChange={setEditorState}
        />

      </EditorContainer>
    </EditorWrapper>
  );
}

export default Editor