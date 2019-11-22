import uuid from 'uuid/v4';

import { DocumentContentRef } from './DocumentContent.model';
import { ModelLocalRaw, ModelRaw, Ref } from './core';

export const MODEL_TYPE = 'Document';

export type DocumentRef = Ref<typeof MODEL_TYPE>;

// -----------------------------------------------------------------------------
// DocumentLocal
// -----------------------------------------------------------------------------

export interface DocumentLocalJSONStub {
  contentRef: DocumentContentRef;
  name: string;
  groups: string[];
}

export type DocumentLocalJSON = ModelLocalRaw<typeof MODEL_TYPE> &
  DocumentLocalJSONStub;

export function createLocal(stub: DocumentLocalJSONStub): DocumentLocalJSON {
  return {
    localID: uuid(),
    modelType: MODEL_TYPE,
    type: 'LOCAL_MODEL',
    ...stub,
  };
}

// -----------------------------------------------------------------------------
// Document
// -----------------------------------------------------------------------------

export interface DocumentJSON extends ModelRaw<typeof MODEL_TYPE> {
  contentRef: DocumentContentRef;
  name: string;
  groups: string[];
}
