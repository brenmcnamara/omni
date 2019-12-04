import ContentEditorEmpty from './ContentEditorEmpty';
import contentEditorStyles from './ContentEditor.module.css';
import FileEditor from './file-editor';
import nullthrows from 'nullthrows';
import React, { useState, useEffect } from 'react';

import { ContentState, EditorState } from 'draft-js';
import { DocumentContent } from '../store/DocumentContent';
import {
  selectActiveDocument,
  selectActiveDocumentContents,
} from '../store/selectors';
import { Model as Document, Ref as DocumentRef } from '../store/Document.model';
import { setDocument, setDocumentContent } from '../store/actions';
import { useDispatch, useSelector, StoreState } from '../store';
import { createSelector } from 'reselect';

const ContentEditor: React.FC = () => {
  const selection = useSelection();
  const dispatch = useDispatch();

  const [fullEditingState, setFullEditingState] = useState(
    calculateFullEditingState(selection),
  );

  useEffect(
    function didChangeDocument() {
      setFullEditingState(calculateFullEditingState(selection));
    },
    [selection],
  );

  if (fullEditingState.type === 'EMPTY') {
    return (
      <div className={contentEditorStyles.root}>
        <ContentEditorEmpty />
      </div>
    );
  }

  const nonEmptyEditingState = fullEditingState as FullEditingState$NonEmpty;

  const onChangeTitle = (title: string) => {
    setFullEditingState({ ...nonEmptyEditingState, title });

    const document = nullthrows(selection.document);
    dispatch(setDocument({ ...document, name: title }));
  };

  const onChangeEditorState = (editorState: EditorState) => {
    setFullEditingState({ ...nonEmptyEditingState, editorState });

    const { documentRef } = nonEmptyEditingState;
    const documentContent = editorState.getCurrentContent().getPlainText();
    dispatch(setDocumentContent(documentRef, documentContent));
  };

  return (
    <div className={contentEditorStyles.root}>
      <FileEditor
        editorState={nonEmptyEditingState.editorState}
        onChangeEditorState={onChangeEditorState}
        onChangeTitle={onChangeTitle}
        title={nonEmptyEditingState.title}
      />
    </div>
  );
};

export default ContentEditor;

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

const getSelection = createSelector(
  (state: StoreState) => state.editMode.documentRef,
  selectActiveDocument,
  selectActiveDocumentContents,
  (
    documentRef: DocumentRef | undefined,
    document: Document | undefined,
    documentContent: DocumentContent | undefined,
  ) => ({
    document,
    documentContent,
    documentRef,
  }),
);

function useSelection(): StateSelection {
  // NOTE: We are limiting redux updates to when the document ref changes.
  // Once a document is being edited, we will not accept updates outside of the
  // component.
  return useSelector(
    getSelection,
    (lhs: StateSelection, rhs: StateSelection) =>
      lhs.documentRef === rhs.documentRef,
  );
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
