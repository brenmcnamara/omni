import DB from './db';
import nullthrows from 'nullthrows';

import { Action } from './Store';
import {
  DocumentContent,
  Model as Document,
  Ref as DocumentRef,
} from './Document.model';
import { getDocument } from './selectors';

export type PureAction =
  | Action$AddDocument
  | Action$PersistDocument
  | Action$SetDocument
  | Action$SetDocumentContent;

export interface Action$AddDocument {
  document: Document;
  documentContent: DocumentContent;
  type: 'ADD_DOCUMENT';
}

export interface Action$PersistDocument {
  document: Document;
  type: 'PERSIST_DOCUMENT';
}

export function addDocument(
  document: Document,
  documentContent: DocumentContent,
): Action {
  return async dispatch => {
    dispatch({
      document,
      documentContent,
      type: 'ADD_DOCUMENT',
    });

    const persisted = await DB.genCreateDocument(nullthrows(document.local));
    const newDocument = new Document(document.local, persisted);

    dispatch({
      document: newDocument,
      type: 'PERSIST_DOCUMENT',
    });
  };
}

export interface Action$SetDocument {
  document: Document;
  type: 'SET_DOCUMENT';
}

export function setDocument(document: Document): Action {
  return async dispatch => {
    dispatch({
      document,
      type: 'SET_DOCUMENT',
    });

    await DB.genSetDocument(nullthrows(document.persisted));
  };
}

export interface Action$SetDocumentContent {
  documentRef: DocumentRef;
  documentContent: DocumentContent;
  type: 'SET_DOCUMENT_CONTENT';
}

export function setDocumentContent(
  documentRef: DocumentRef,
  documentContent: DocumentContent,
): Action {
  return async (dispatch, getState) => {
    dispatch({
      documentRef,
      documentContent,
      type: 'SET_DOCUMENT_CONTENT',
    });

    const documentID = nullthrows(getDocument(getState(), documentRef)).id;
    await DB.genSetDocumentContent(documentID, documentContent);
  };
}
