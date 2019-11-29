import * as t from 'io-ts';

import {
  createLocal as _createLocal,
  Local as _Local,
  Model as _Model,
  Persisted as _Persisted,
  Ref as _Ref,
  tLocal as _tLocal,
  tPersisted as _tPersisted,
  tRef as _tRef,
} from './core';

export type DocumentContent = string;

export const MODEL_TYPE = 'Document';

// -----------------------------------------------------------------------------
// Ref
// -----------------------------------------------------------------------------

export type Ref = _Ref<typeof MODEL_TYPE>;

export const tRef = _tRef('Document');

export function createRef(val: string | Model): Ref {
  if (typeof val === 'string') {
    return { refID: val, refType: MODEL_TYPE, type: 'REF' };
  }

  switch (val.type) {
    case 'MODEL':
      return { refID: val.id, refType: MODEL_TYPE, type: 'REF' };

    case 'MODEL_LOCAL':
      return { refID: val.localID, refType: MODEL_TYPE, type: 'REF' };
  }
}

// -----------------------------------------------------------------------------
// Local
// -----------------------------------------------------------------------------

export interface LocalStub {
  groups: string[];
  name: string;
}

export type Local = _Local<typeof MODEL_TYPE> & LocalStub;

export const tLocal = t.intersection([
  _tLocal(MODEL_TYPE),
  t.type({
    groups: t.array(t.string),
    name: t.string,
  }),
]);

export function createLocal(stub: LocalStub): Local {
  return {
    ..._createLocal(MODEL_TYPE),
    ...stub,
  };
}

// -----------------------------------------------------------------------------
// Persisted
// -----------------------------------------------------------------------------

export interface PersistedStub {
  name: string;
  groups: string[];
}

export type Persisted = _Persisted<typeof MODEL_TYPE> & PersistedStub;

export const tPersisted: t.Type<Persisted> = t.intersection([
  _tPersisted(MODEL_TYPE),
  t.type({
    groups: t.array(t.string),
    name: t.string,
  }),
]);

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

export type Model = Local | Persisted;
