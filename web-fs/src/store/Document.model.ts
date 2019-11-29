import * as t from 'io-ts';
import tStringSerialize from './tSerialize/tStringSerialize';

import {
  createLocal as _createLocal,
  Local as _Local,
  Model as _Model,
  Persisted as _Persisted,
  Ref as _Ref,
  tLocal as _tLocal,
  tLocalSerialize as _tLocalSerialize,
  tPersisted as _tPersisted,
  tPersistedSerialize as _tPersistedSerialize,
  tRef as _tRef,
  tRefSerialize as _tRefSerialize,
} from './core';

export const MODEL_TYPE = 'Document';

// -----------------------------------------------------------------------------
// Ref
// -----------------------------------------------------------------------------

export type Ref = _Ref<typeof MODEL_TYPE>;

export const tRef = _tRef(MODEL_TYPE);

export const tRefSerialize = _tRefSerialize(MODEL_TYPE);

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

export const tLocalSerialize = t.intersection([
  _tLocalSerialize(MODEL_TYPE),
  t.type({
    groups: t.array(tStringSerialize),
    name: tStringSerialize,
  }),
]);

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

export const tPersistedSerialize = t.intersection([
  _tPersistedSerialize(MODEL_TYPE),
  t.type({
    groups: t.array(tStringSerialize),
    name: tStringSerialize,
  }),
]);

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

export type Model = Local | Persisted;

export const tModel = t.union([tLocal, tPersisted]);

export const tModelSerialize = t.union([tLocal, tPersisted]);
