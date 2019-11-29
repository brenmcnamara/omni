import { Action } from './Store';
import {
  DocumentContent,
  Local as DocumentLocal,
  Model as Document,
  Ref as DocumentRef,
} from './Document.model';
import { State as EditMode } from './editMode.reducer';

export type PureAction =
  | Action$AddDocument
  | Action$SetDocument
  | Action$SetDocumentContent
  | Action$SetEditMode;

export interface Action$AddDocument {
  documentLocal: DocumentLocal;
  documentContent: DocumentContent;
  type: 'ADD_DOCUMENT';
}

export function addDocument(
  documentLocal: DocumentLocal,
  documentContent: DocumentContent,
): Action$AddDocument {
  return {
    documentContent,
    documentLocal,
    type: 'ADD_DOCUMENT',
  };
}

export interface Action$SetDocument {
  document: Document;
  type: 'SET_DOCUMENT';
}

export function setDocument(document: Document): Action$SetDocument {
  return {
    document,
    type: 'SET_DOCUMENT',
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
): Action$SetDocumentContent {
  return {
    documentRef,
    documentContent,
    type: 'SET_DOCUMENT_CONTENT',
  };
}

interface Action$SetEditMode {
  editMode: EditMode;
  type: 'SET_EDIT_MODE';
}

export function setEditMode(editMode: EditMode): Action$SetEditMode {
  return {
    editMode,
    type: 'SET_EDIT_MODE',
  };
}
