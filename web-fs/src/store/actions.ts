import { DocumentLocalJSON } from './Document.model';

export type Action = Action$DocumentCreate;

export interface Action$DocumentCreate {
  documentLocal: DocumentLocalJSON;
  type: 'DOCUMENT_CREATE';
}
