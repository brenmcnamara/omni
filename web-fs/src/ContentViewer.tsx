import './ContentViewer.css';

import FileEditor from './file-editor';
import React, { useState } from 'react';

import { addDocument, setDocument, setDocumentContent } from './store/actions';
import {
  createLocal as createDocumentLocal,
  Model as Document,
} from './store/Document.model';
import { DocumentContent } from './store/DocumentContent';
import { ContentState, EditorState } from 'draft-js';
import { getDocument, getDocumentContent } from './store/selectors';
import { State as State$EditMode } from './store/editMode.reducer';
import { useDispatch, useSelector } from './store';

const ContentViewer: React.FC = () => {
  const reduxState = useSelection();
  const dispatch = useDispatch();

  const [title, setTitle] = useState(
    reduxState.document ? reduxState.document.name : 'Untitled Document',
  );

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromText(reduxState.documentContent),
    ),
  );

  const onChangeTitle = (title: string) => {
    const { editMode } = reduxState;
    switch (editMode.type) {
      case 'NEW_DOCUMENT': {
        const documentLocal = createDocumentLocal({
          groups: [],
          name: title,
        });
        dispatch(addDocument(documentLocal, ''));
        break;
      }

      case 'EDIT_DOCUMENT': {
        if (reduxState.document) {
          const { document } = reduxState;
          dispatch(setDocument({ ...document, name: title }));
        }
      }
    }
  };

  const onChangeEditorState = (editorState: EditorState) => {
    setEditorState(editorState);

    const { editMode } = reduxState;
    const documentContent = editorState.getCurrentContent().getPlainText();

    switch (editMode.type) {
      case 'NEW_DOCUMENT': {
        const document = createDocumentLocal({
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
  };

  return (
    <div className="ContentViewer-root">
      <FileEditor
        editorState={editorState}
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
        ? getDocument(state, editMode.documentRef)
        : undefined;

    const documentContent =
      editMode.type === 'EDIT_DOCUMENT'
        ? getDocumentContent(state, editMode.documentRef) || ''
        : '';

    return { document, documentContent, editMode };
  });
}
