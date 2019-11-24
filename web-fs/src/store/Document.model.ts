import nullthrows from 'nullthrows';
import uuid from 'uuid/v4';

import { ModelBase, ModelLocal, ModelPersisted, ModelRef } from './core';

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
  name: string;
  groups: string[];
}

export type Local = ModelLocal<typeof MODEL_TYPE> & LocalStub;

// -----------------------------------------------------------------------------
// Persisted
// -----------------------------------------------------------------------------

export interface PersistedStub {
  name: string;
  groups: string[];
}

export type Persisted = ModelPersisted<typeof MODEL_TYPE> & PersistedStub;

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

  public get groups(): string[] {
    return this.persisted
      ? this.persisted.groups
      : nullthrows(this.local).groups;
  }
}
