import * as t from 'io-ts';
import nullthrows from 'nullthrows';

import { either } from 'fp-ts/lib/Either';

export interface ModelRef<TType extends string> {
  refID: string;
  refType: TType;
  type: 'REF';
}

export interface ModelLocal<TType extends string> {
  localID: string;
  modelType: TType;
  type: 'MODEL_LOCAL';
}

export interface ModelPersisted<TType extends string> {
  createdAt: Date;
  id: string;
  isDeleted: boolean;
  modelType: TType;
  type: 'MODEL';
  updatedAt: Date;
}

export class ModelBase<
  TType extends string,
  TLocal extends ModelLocal<TType>,
  TPersisted extends ModelPersisted<TType>
> {
  protected local: TLocal | null = null;

  protected persisted: TPersisted | null = null;

  constructor(local: TLocal | null, persisted: TPersisted | null) {
    this.local = local;
    this.persisted = persisted;
  }

  public get type(): 'MODEL' {
    return 'MODEL';
  }

  public get modelType(): TType {
    return this.persisted
      ? this.persisted.modelType
      : nullthrows(this.local).modelType;
  }

  public get id(): string {
    return this.persisted ? this.persisted.id : nullthrows(this.local).localID;
  }
}

// export const tDateFromString = new t.Type<Date, string, unknown>(
//   'Date',
//   (u): u is Date => u instanceof Date,
//   (u, c) =>
//     either.chain(t.string.validate(u, c), s => {
//       const d = new Date(s);
//       return isNaN(d.getTime()) ? t.failure(u, c) : t.success(d);
//     }),
//   a => a.toISOString(),
// );

export const tDate = new t.Type<Date>(
  'Date',
  (u): u is Date => u instanceof Date,
  (u, c) => (u instanceof Date ? t.success(u) : t.failure(u, c)),
  t.identity,
);

export function tModelLocal<TType extends string>(modelType: TType) {
  return t.type({
    localID: t.string,
    modelType: t.literal(modelType),
    type: t.literal('MODEL_LOCAL'),
  });
}

export function tModelPersisted<TType extends string>(modelType: TType) {
  return t.type({
    createdAt: tDate,
    id: t.string,
    isDeleted: t.boolean,
    modelType: t.literal(modelType),
    type: t.literal('MODEL'),
    updatedAt: tDate,
  });
}
