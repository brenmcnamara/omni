import { Action as _Action } from 'redux';
import { DocumentContent } from './DocumentContent';
import {
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

export interface Action$AddDocument extends _Action<'ADD_DOCUMENT'> {
  documentLocal: DocumentLocal;
  documentContent: DocumentContent;
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

export interface Action$SetDocument extends _Action<'SET_DOCUMENT'> {
  document: Document;
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

interface Action$SetEditMode extends _Action<'SET_EDIT_MODE'> {
  editMode: EditMode;
}

export function setEditMode(editMode: EditMode): Action$SetEditMode {
  return {
    editMode,
    type: 'SET_EDIT_MODE',
  };
}
