import './FileEditor.css';

import classnames from 'classnames';
import fontStyles from '../text/Font.module.css';
import React from 'react';

import { ContentBlock, Editor, EditorState } from 'draft-js';
import { useSelector } from '../store';
import { getThemeInfo } from '../store/selectors';

interface Props {
  editorRef?: React.RefObject<Editor>;
  editorState: EditorState;
  onChange: (state: EditorState) => void;
}

const FileEditorContent: React.FC<Props> = (props: Props) => {
  function onChangeEditorState(editorState: EditorState) {
    props.onChange(editorState);
  }

  function blockStyleFn(block: ContentBlock): string {
    return fontStyles.docP;
  }

  const theme = useSelector(state => getThemeInfo(state).theme);

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
        editorState={props.editorState}
        onChange={onChangeEditorState}
        ref={props.editorRef}
      />
    </div>
  );
};

export default FileEditorContent;
