import classnames from 'classnames';
import FileEditorContent from './FileEditorContent';
import fileEditorStyles from './FileEditor.module.css';
import FileEditorTitle from './FileEditorTitle';
import GroupEditor from './GroupEditor';
import React from 'react';

import { EditorState } from 'draft-js';

interface Props {
  editorState: EditorState;
  groups: string[];
  onChangeEditorState: (editorState: EditorState) => void;
  onChangeGroups: (groups: string[]) => void;
  onChangeTitle: (title: string) => void;
  title: string;
}

const FileEditor: React.FC<Props> = (props: Props) => {
  function onEnterTitle() {}

  return (
    <div className={classnames(fileEditorStyles.root)}>
      <FileEditorTitle
        onChange={props.onChangeTitle}
        onEnter={onEnterTitle}
        title={props.title}
      />
      <GroupEditor groups={props.groups} onChange={props.onChangeGroups} />
      <FileEditorContent
        editorState={props.editorState}
        onChange={props.onChangeEditorState}
      />
    </div>
  );
};

export default FileEditor;
