import { DocumentContent, Model as Document } from './Document.model';

export type Action = Action$AddDocument;

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
