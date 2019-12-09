import classnames from 'classnames';
import ContentAnnotationGutter from './ContentAnnotationGutter';
import fileEditorStyles from './FileEditor.module.css';
import fontStyles from '../../text/Font.module.css';
import React from 'react';

import { ContentBlock, Editor, EditorState } from 'draft-js';
import { useTheme } from '../../theme';

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

  const { theme } = useTheme()[0];

  return (
    <div
      className={classnames(
        fileEditorStyles.contentContainer,
        theme.fontColorPrimary,
        'padding-vert-20',
      )}
    >
      <ContentAnnotationGutter />
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
