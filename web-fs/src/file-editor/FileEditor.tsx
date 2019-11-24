import './FileEditor.css';

import classnames from 'classnames';
import FileEditorContent from './FileEditorContent';
import FileEditorTitle from './FileEditorTitle';
import React from 'react';

import { addDocument } from '../store/actions';
import { DocumentContent, Model as Document } from '../store/Document.model';
import { EditorState } from 'draft-js';
import { useDispatch, useSelector } from '../store';
import { State as State$EditMode } from '../store/editMode.reducer';
import { useThrottle } from '../throttle';

interface Props {
  onChangeTitle: (title: string) => void;
  title: string;
}

const FileEditor: React.FC<Props> = (props: Props) => {
  const reduxState = useSelection();
  const dispatch = useDispatch();

  const onChangeTitle = useThrottle(1000, (title: string) => {
    console.log(reduxState.editMode.type);
    switch (reduxState.editMode.type) {
      case 'NEW_DOCUMENT': {
        const document = Document.createLocal({
          groups: [],
          name: title,
        });
        dispatch(addDocument(document, ''));
        break;
      }
    }
  });

  function onEnterTitle() {}

  const onChangeEditorState = useThrottle(
    1000,
    (editorState: EditorState) => {},
  );

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
