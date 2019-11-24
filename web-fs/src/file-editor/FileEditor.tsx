import './FileEditor.css';

import classnames from 'classnames';
import FileEditorContent from './FileEditorContent';
import FileEditorTitle from './FileEditorTitle';
import React from 'react';
import throttle from '../throttle';

import { DocumentContent } from '../store/Document.model';
import { useDispatch, useSelector } from '../store';
import { State as State$EditMode } from '../store/editMode.reducer';

interface Props {
  onChangeTitle: (title: string) => void;
  title: string;
}

const FileEditor: React.FC<Props> = (props: Props) => {
  const reduxState = useSelection();
  const dispatch = useDispatch();

  const onChangeTitle = throttle(400, (title: string) => {
    console.log(title);
  });

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
  documentContent: DocumentContent;
  editMode: State$EditMode;
}

function useSelection(): StateSelection {
  return useSelector(state => {
    const { editMode } = state;

    const documentContent =
      editMode.type === 'EDIT_DOCUMENT'
        ? state.documents.documentContents[editMode.documentRef.refID] || ''
        : '';

    return { documentContent, editMode };
  });
}
