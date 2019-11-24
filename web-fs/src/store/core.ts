import nullthrows from 'nullthrows';

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
