import './ContentViewer.css';

import ContentViewerEmpty from './ContentViewerEmpty';
import FileEditor from '../file-editor';
import nullthrows from 'nullthrows';
import React, { useState, useEffect } from 'react';

import { DocumentContent } from '../store/DocumentContent';
import { ContentState, EditorState } from 'draft-js';
import { getDocument, getDocumentContent } from '../store/selectors';
import { Model as Document, Ref as DocumentRef } from '../store/Document.model';
import { setDocument, setDocumentContent } from '../store/actions';
import { useDispatch, useSelector } from '../store';

const ContentViewer: React.FC = () => {
  const reduxState = useSelection();
  const dispatch = useDispatch();

  const [fullEditingState, setFullEditingState] = useState(
    calculateFullEditingState(reduxState),
  );

  // TODO: This useEffect hook isn't properly defined. The dependencies listed
  // aren't the only parameters being used. Need a way of properly defining
  // this.
  useEffect(
    function didChangeDocument() {
      setFullEditingState(calculateFullEditingState(reduxState));
    },
    [reduxState.documentRef],
  );

  if (fullEditingState.type === 'EMPTY') {
    return (
      <div className="ContentViewer-root">
        <ContentViewerEmpty />
      </div>
    );
  }

  const nonEmptyEditingState = fullEditingState as FullEditingState$NonEmpty;

  const onChangeTitle = (title: string) => {
    setFullEditingState({ ...nonEmptyEditingState, title });

    const document = nullthrows(reduxState.document);
    dispatch(setDocument({ ...document, name: title }));
  };

  const onChangeEditorState = (editorState: EditorState) => {
    setFullEditingState({ ...nonEmptyEditingState, editorState });

    const { documentRef } = nonEmptyEditingState;
    const documentContent = editorState.getCurrentContent().getPlainText();
    dispatch(setDocumentContent(documentRef, documentContent));
  };

  return (
    <div className="ContentViewer-root">
      <FileEditor
        editorState={nonEmptyEditingState.editorState}
        onChangeEditorState={onChangeEditorState}
        onChangeTitle={onChangeTitle}
        title={nonEmptyEditingState.title}
      />
    </div>
  );
};

export default ContentViewer;

// -----------------------------------------------------------------------------
// Full Editing State
// -----------------------------------------------------------------------------

interface FullEditingState$Empty {
  type: 'EMPTY';
}

interface FullEditingState$NonEmpty {
  documentRef: DocumentRef;
  editorState: EditorState;
  title: string;
  type: 'NON_EMPTY';
}

type FullEditingState = FullEditingState$Empty | FullEditingState$NonEmpty;

function calculateFullEditingState(
  selection: StateSelection,
): FullEditingState {
  if (selection.document === undefined) {
    return { type: 'EMPTY' };
  }

  return {
    documentRef: nullthrows(selection.documentRef),
    editorState: createEditorState(nullthrows(selection.documentContent)),
    title: selection.document.name,
    type: 'NON_EMPTY',
  };
}

// -----------------------------------------------------------------------------
// State Selection
// -----------------------------------------------------------------------------

interface StateSelection {
  document: Document | undefined;
  documentRef: DocumentRef | undefined;
  documentContent: DocumentContent | undefined;
}

function useSelection(): StateSelection {
  return useSelector(state => {
    const { editMode } = state;

    const document =
      editMode.documentRef !== undefined
        ? getDocument(state, editMode.documentRef)
        : undefined;

    const documentContent =
      editMode.documentRef !== undefined
        ? getDocumentContent(state, editMode.documentRef) || ''
        : '';

    return { document, documentRef: editMode.documentRef, documentContent };
  });
}

// -----------------------------------------------------------------------------
// UTILS
// -----------------------------------------------------------------------------

function createEditorState<TParam extends DocumentContent | undefined>(
  documentContent: TParam,
): TParam extends undefined ? undefined : EditorState {
  if (documentContent === undefined) {
    // @ts-ignore - Need to figure out ternary type.
    return undefined;
  }
  // @ts-ignore - Need to figure out ternary type.
  return EditorState.createWithContent(
    ContentState.createFromText(documentContent as DocumentContent),
  );
}
