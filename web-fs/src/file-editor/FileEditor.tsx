import './FileEditor.css';

import classnames from 'classnames';
import FileEditorContent from './FileEditorContent';
import FileEditorTitle from './FileEditorTitle';
import React from 'react';

import { useDispatch, useSelector } from '../store';

interface Props {
  onChangeTitle: (title: string) => void;
  title: string;
}

const FileEditor: React.FC<Props> = (props: Props) => {
  const editMode = useSelector(state => state.editMode);
  const dispatch = useDispatch();

  console.log(editMode);

  function onChangeTitle(title: string) {}

  function onEnterTitle() {}

  function onChangeEditorState() {}

  return (
    <div className={classnames('FileEditor-root')}>
      <FileEditorTitle
        onChange={onChangeTitle}
        onEnter={onEnterTitle}
        title="Untitled Document"
      />
      <FileEditorContent onChange={onChangeEditorState} />
    </div>
  );
};

export default FileEditor;
