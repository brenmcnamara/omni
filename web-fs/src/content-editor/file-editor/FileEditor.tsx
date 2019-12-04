import './FileEditor.css';

import classnames from 'classnames';
import FileEditorContent from './FileEditorContent';
import FileEditorTitle from './FileEditorTitle';
import React from 'react';

import { EditorState } from 'draft-js';

interface Props {
  editorState: EditorState;
  onChangeEditorState: (editorState: EditorState) => void;
  onChangeTitle: (title: string) => void;
  title: string;
}

const FileEditor: React.FC<Props> = (props: Props) => {
  function onEnterTitle() {}

  return (
    <div className={classnames('FileEditor-root')}>
      <FileEditorTitle
        onChange={props.onChangeTitle}
        onEnter={onEnterTitle}
        title={props.title}
      />
      <FileEditorContent
        editorState={props.editorState}
        onChange={props.onChangeEditorState}
      />
    </div>
  );
};

export default FileEditor;
