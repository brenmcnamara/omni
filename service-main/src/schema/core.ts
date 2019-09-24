import * as t from 'io-ts';

export interface Ref<TType extends string> {}

export function tRef<TType extends string>(type: TType) {
  return t.type({
    refID: t.string,
    refType: t.literal(type),
    type: t.literal('REF'),
  });
}

export const tRefGeneric = t.type({
  refID: t.string,
  refType: t.string,
  type: t.literal('REF'),
});

export interface ModelFields<TType extends string> {
  createdAt: Date;
  id: string;
  isDeleted: boolean;
  modelType: TType;
  type: 'MODEL';
  updatedAt: Date;
}

export interface ModelClass<
  TType extends string,
  TStub,
  TModel extends Model<TType, TStub>
> {
  modelType: TType;
  new (raw: TStub): TModel;
}

export class Model<TType extends string, TStub> {
  protected raw: ModelFields<TType> & TStub;

  constructor(raw: ModelFields<TType> & TStub) {
    this.raw = raw;
  }

  public get createdAt(): Date {
    return this.raw.createdAt;
  }

  public get id() {
    return this.raw.id;
  }

  public get isDeleted(): boolean {
    return this.raw.isDeleted;
  }

  public get modelType(): TType {
    return this.raw.modelType;
  }

  public get type(): 'MODEL' {
    return 'MODEL';
  }

  public createRef(): Ref<TType> {
    return {
      refID: this.id,
      refType: this.raw.modelType,
      type: 'REF',
    };
  }
}
