import {
  DocumentContent,
  Model as Document,
  Ref as DocumentRef,
} from './Document.model';

export type PureAction =
  | Action$AddDocument
  | Action$SetDocument
  | Action$SetDocumentContent;

export interface Action$AddDocument {
  document: Document;
  documentContent: DocumentContent;
  type: 'ADD_DOCUMENT';
}

export function addDocument(
  document: Document,
  documentContent: DocumentContent,
): Action$AddDocument {
  return {
    document,
    documentContent,
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
