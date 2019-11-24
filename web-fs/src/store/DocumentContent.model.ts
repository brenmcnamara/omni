import uuid from 'uuid/v4';

import { ModelLocalRaw, ModelRaw, ModelRef } from './core';
import { Ref as DocumentRef } from './Document.model';

export const MODEL_TYPE = 'DocumentContent';

// -----------------------------------------------------------------------------
// Ref
// -----------------------------------------------------------------------------

export type Ref = ModelRef<typeof MODEL_TYPE>;

export function createRef(refID: string): Ref {
  return {
    refID,
    refType: MODEL_TYPE,
    type: 'REF',
  };
}

// -----------------------------------------------------------------------------
// Local
// -----------------------------------------------------------------------------

export interface LocalRawStub {
  data: string;
  documentRef: DocumentRef;
}

export type LocalRaw = ModelLocalRaw<typeof MODEL_TYPE> & LocalRawStub;

export function createLocal(stub: LocalRawStub): LocalRaw {
  return {
    localID: uuid(),
    modelType: MODEL_TYPE,
    type: 'LOCAL_MODEL',
    ...stub,
  };
}

// -----------------------------------------------------------------------------
// Raw
// -----------------------------------------------------------------------------

export interface Raw extends ModelRaw<typeof MODEL_TYPE> {
  data: string;
}
