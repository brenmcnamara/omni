import uuid from 'uuid/v4';

import { Ref as DocumentContentRef } from './DocumentContent.model';
import { ModelLocalRaw, ModelRaw, ModelRef } from './core';

export const MODEL_TYPE = 'Document';

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
  contentRef: DocumentContentRef;
  name: string;
  groups: string[];
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
  contentRef: DocumentContentRef;
  name: string;
  groups: string[];
}
