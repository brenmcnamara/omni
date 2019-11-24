import './FileEditor.css';

import classnames from 'classnames';
import FileEditorContent from './FileEditorContent';
import FileEditorTitle from './FileEditorTitle';
import React from 'react';

import { DocumentContent } from '../store/Document.model';
import { useDispatch, useSelector } from '../store';
import { State as State$EditMode } from '../store/editMode.reducer';
import { StoreState } from '../store/Store';

interface Props {
  onChangeTitle: (title: string) => void;
  title: string;
}

const FileEditor: React.FC<Props> = (props: Props) => {
  const editMode = useSelector(state => state.editMode);
  const dispatch = useDispatch();

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

// -----------------------------------------------------------------------------
// State Selection
// -----------------------------------------------------------------------------

interface StateSelection {
  editMode: State$EditMode;
  documentContent: DocumentContent;
}

function useSelection(state: StoreState) {}
