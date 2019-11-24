import { DocumentContent, Model as Document } from './Document.model';

export type Action = Action$CreateDocument;

export interface Action$CreateDocument {
  document: Document;
  documentContent: DocumentContent;
  type: 'CREATE_DOCUMENT';
}
