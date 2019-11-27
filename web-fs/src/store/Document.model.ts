import * as t from 'io-ts';
import nullthrows from 'nullthrows';
import uuid from 'uuid/v4';

import {
  ModelBase,
  ModelLocal,
  ModelPersisted,
  ModelRef,
  tModelLocal,
  tModelPersisted,
} from './core';

export type DocumentContent = string;

export const MODEL_TYPE = 'Document';

// -----------------------------------------------------------------------------
// Ref
// -----------------------------------------------------------------------------

export type Ref = ModelRef<typeof MODEL_TYPE>;

// -----------------------------------------------------------------------------
// Local
// -----------------------------------------------------------------------------

export interface LocalStub {
  groups: string[];
  name: string;
}

export type Local = ModelLocal<typeof MODEL_TYPE> & LocalStub;

export const tLocal = t.intersection([
  tModelLocal(MODEL_TYPE),
  t.type({
    groups: t.array(t.string),
    name: t.string,
  }),
]);

// -----------------------------------------------------------------------------
// Persisted
// -----------------------------------------------------------------------------

export interface PersistedStub {
  name: string;
  groups: string[];
}

export type Persisted = ModelPersisted<typeof MODEL_TYPE> & PersistedStub;

export const tPersisted: t.Type<Persisted> = t.intersection([
  tModelPersisted(MODEL_TYPE),
  t.type({
    groups: t.array(t.string),
    name: t.string,
  }),
]);

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

export class Model extends ModelBase<typeof MODEL_TYPE, Local, Persisted> {
  public static createRef(id: string): Ref {
    return {
      refID: id,
      refType: MODEL_TYPE,
      type: 'REF',
    };
  }

  public static createLocal(stub: LocalStub): Model {
    const local: Local = {
      localID: `local-${uuid()}`,
      modelType: MODEL_TYPE,
      type: 'MODEL_LOCAL',
      ...stub,
    };
    return new Model(local, null);
  }

  public createRef(): Ref {
    return Model.createRef(this.id);
  }

  public get name(): string {
    return this.persisted ? this.persisted.name : nullthrows(this.local).name;
  }

  public setName(name: string): Model {
    const local = this.local && { ...this.local, name };
    const persisted = this.persisted && { ...this.persisted, name };
    return new Model(local, persisted);
  }

  public get groups(): string[] {
    return this.persisted
      ? this.persisted.groups
      : nullthrows(this.local).groups;
  }

  public setGroups(groups: string[]): Model {
    const local = this.local && { ...this.local, groups };
    const persisted = this.persisted && { ...this.persisted, groups };
    return new Model(local, persisted);
  }
}
