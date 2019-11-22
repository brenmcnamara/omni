import './FileEditor.css';

import classnames from 'classnames';
import fontStyles from '../text/Font.module.css';
import React, { useState } from 'react';

import { ContentBlock, Editor, EditorState } from 'draft-js';
import { useTheme } from '../theme';

interface Props {
  editorRef?: React.RefObject<Editor>;
  onChange: (state: EditorState) => void;
}

const FileEditorContent: React.FC<Props> = (props: Props) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty(),
  );

  function onChangeEditorState(editorState: EditorState) {
    setEditorState(editorState);
    props.onChange(editorState);
  }

  function blockStyleFn(block: ContentBlock): string {
    return fontStyles.docP;
  }

  const { theme } = useTheme()[0];

  return (
    <div
      className={classnames(
        'FileEditor-contentContainer',
        theme.fontColorPrimary,
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
