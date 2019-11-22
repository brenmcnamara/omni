import { DocumentContentLocalJSON } from './DocumentContent.model';
import { DocumentLocalJSON } from './Document.model';

export type Action = Action$CreateDocument;

export interface Action$CreateDocument {
  documentContentLocal: DocumentContentLocalJSON;
  documentLocal: DocumentLocalJSON;
  type: 'CREATE_DOCUMENT';
}
