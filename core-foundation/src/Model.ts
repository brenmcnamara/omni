import * as t from 'io-ts';

import { either } from 'fp-ts/lib/Either';
import { Ref } from './Ref';

export interface ModelStub<TType extends string> {
  createdAt: Date;
  id: string;
  isDeleted: boolean;
  modelType: TType;
  type: 'MODEL';
  updatedAt: Date;
}

export const tDate = new t.Type<Date, string, unknown>(
  'Date',
  (u): u is Date => u instanceof Date,
  (u, c) =>
    either.chain(t.string.validate(u, c), s => {
      const d = new Date(s);
      return isNaN(d.getTime()) ? t.failure(u, c) : t.success(d);
    }),
  a => a.toISOString(),
);

export function tModelStub<TType extends string>(type: TType) {
  return t.type({
    createdAt: tDate,
    id: t.string,
    isDeleted: t.boolean,
    modelType: t.literal(type),
    type: t.literal('MODEL'),
    updatedAt: tDate,
  });
}

export class Model<TType extends string, TRaw extends ModelStub<TType>> {
  private raw: TRaw;

  static t<TType extends string, TRaw extends ModelStub<TType>>(): t.Type<
    TRaw,
    Object,
    unknown
  > {
    throw Error('Expecting subclass to implement t');
  }

  constructor(raw: TRaw) {
    this.raw = raw;
  }

  get createdAt(): Date {
    return this.raw.createdAt;
  }

  get id(): string {
    return this.raw.id;
  }

  get isDeleted(): boolean {
    return this.raw.isDeleted;
  }

  get modelType(): TType {
    return this.raw.modelType;
  }

  get type(): 'MODEL' {
    return 'MODEL';
  }

  get updatedAt(): Date {
    return this.raw.updatedAt;
  }

  public createRef(): Ref<TType> {
    return {
      refID: this.id,
      refType: this.modelType,
      type: 'REF',
    };
  }
}
