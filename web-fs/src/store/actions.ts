import { LocalRaw as DocumentContentLocalRaw } from './DocumentContent.model';
import { LocalRaw as DocumentLocalRaw } from './Document.model';

export type Action = Action$CreateDocument;

export interface Action$CreateDocument {
  documentContentLocal: DocumentContentLocalRaw;
  documentLocal: DocumentLocalRaw;
  type: 'CREATE_DOCUMENT';
}
