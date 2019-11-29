import * as t from 'io-ts';
import uuid from 'uuid/v4';

export const tDate = new t.Type<Date>(
  'Date',
  (u): u is Date => u instanceof Date,
  (u, c) => (u instanceof Date ? t.success(u) : t.failure(u, c)),
  t.identity,
);

export interface Ref<TType extends string> {
  refID: string;
  refType: TType;
  type: 'REF';
}

export function tRef<TType extends string>(refType: TType) {
  return t.type({
    refID: t.string,
    refType: t.literal(refType),
    type: t.literal('REF'),
  });
}

export interface Local<TType extends string> {
  localID: string;
  modelType: TType;
  type: 'MODEL_LOCAL';
}

export function createLocal<TType extends string>(
  modelType: TType,
): Local<TType> {
  return {
    localID: uuid(),
    modelType,
    type: 'MODEL_LOCAL',
  };
}
export function tLocal<TType extends string>(modelType: TType) {
  return t.type({
    id: t.string,
    modelType: t.literal(modelType),
    type: t.literal('MODEL_LOCAL'),
  });
}

export interface Persisted<TType extends string> {
  createdAt: Date;
  id: string;
  isDeleted: boolean;
  localID?: string;
  modelType: TType;
  type: 'MODEL';
  updatedAt: Date;
}

export function tPersisted<TType extends string>(modelType: TType) {
  return t.type({
    createdAt: tDate,
    id: t.string,
    isDeleted: t.boolean,
    modelType: t.literal(modelType),
    type: t.literal('MODEL'),
    updatedAt: tDate,
  });
}

export type Model<TType extends string> = Local<TType> | Persisted<TType>;

export function getID(model: Model<any>): string {
  return model.type === 'MODEL' ? model.id : model.localID;
}

export function getLocalID(model: Model<any>): string | undefined {
  return model.type === 'MODEL' ? model.localID : model.localID;
}

export function matchesRef<TType extends string>(
  model: Model<TType>,
  ref: Ref<TType>,
): boolean {
  switch (model.type) {
    case 'MODEL':
      return ref.refID === model.id || ref.refID === model.localID;

    case 'MODEL_LOCAL':
      return ref.refID === model.localID;
  }
}
