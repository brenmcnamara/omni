import './ContentViewer.css';

import FileEditor from './file-editor';
import nullthrows from 'nullthrows';
import React, { useState } from 'react';

import { addDocument, setDocument, setDocumentContent } from './store/actions';
import { DocumentContent, Model as Document } from './store/Document.model';
import { EditorState } from 'draft-js';
import { State as State$EditMode } from './store/editMode.reducer';
import { useDispatch, useSelector } from './store';
import { useThrottle } from './throttle';

const ContentViewer: React.FC = () => {
  const [title, setTitle] = useState('Untitled Document');

  const reduxState = useSelection();
  const dispatch = useDispatch();

  const onChangeTitle = useThrottle(1000, (title: string) => {
    const { editMode } = reduxState;
    switch (editMode.type) {
      case 'NEW_DOCUMENT': {
        const document = Document.createLocal({
          groups: [],
          name: title,
        });
        dispatch(addDocument(document, ''));
        break;
      }

      case 'EDIT_DOCUMENT': {
        const document = nullthrows(reduxState.document);
        dispatch(setDocument(document.setName(title)));
      }
    }
  });

  const onChangeEditorState = useThrottle(1000, (editorState: EditorState) => {
    const { editMode } = reduxState;
    const documentContent = editorState.getCurrentContent().getPlainText();

    switch (editMode.type) {
      case 'NEW_DOCUMENT': {
        const document = Document.createLocal({
          groups: [],
          name: title,
        });

        dispatch(
          addDocument(document, editorState.getCurrentContent().getPlainText()),
        );
        break;
      }

      case 'EDIT_DOCUMENT': {
        dispatch(setDocumentContent(editMode.documentRef, documentContent));
        break;
      }
    }
  });

  return (
    <div className="ContentViewer-root">
      <FileEditor
        onChangeEditorState={onChangeEditorState}
        onChangeTitle={onChangeTitle}
        title={title}
      />
    </div>
  );
};

export default ContentViewer;

// -----------------------------------------------------------------------------
// State Selection
// -----------------------------------------------------------------------------

interface StateSelection {
  document: Document | undefined;
  documentContent: DocumentContent;
  editMode: State$EditMode;
}

function useSelection(): StateSelection {
  return useSelector(state => {
    const { editMode } = state;

    const document =
      editMode.type === 'EDIT_DOCUMENT'
        ? state.documents.documents[editMode.documentRef.refID]
        : undefined;

    const documentContent =
      editMode.type === 'EDIT_DOCUMENT'
        ? state.documents.documentContents[editMode.documentRef.refID] || ''
        : '';

    return { document, documentContent, editMode };
  });
}
