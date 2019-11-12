import './FileEditor.css';

import classnames from 'classnames';
import React, { useState } from 'react';

import { ContentBlock, Editor, EditorState } from 'draft-js';
import { DocumentContent } from '../document';
import { useThemedFontMode, getTextClassNames } from '../text';

interface Props {
  editorRef?: React.RefObject<Editor>;
  onChange: (content: DocumentContent) => void;
}

const FileEditorContent: React.FC<Props> = (props: Props) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty(),
  );

  function onChangeEditorState(editorState: EditorState) {
    setEditorState(editorState);
  }

  function blockStyleFn(block: ContentBlock): string {
    return classnames('FontColor-primary', 'FontStyle-doc-p');
  }

  const fontMode = useThemedFontMode();

  return (
    <div
      className={classnames(
        'FileEditor-contentContainer',
        `FontMode-${fontMode}`,
        'padding-vert-20',
      )}
    >
      <Editor
        blockStyleFn={blockStyleFn}
        editorState={editorState}
        onChange={onChangeEditorState}
        ref={props.editorRef}
      />
    </div>
  );
};

export default FileEditorContent;
