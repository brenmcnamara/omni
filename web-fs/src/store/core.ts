export interface Ref<TType extends string> {
  refID: string;
  refType: TType;
  type: 'REF';
}

export interface ModelLocalRaw<TType extends string> {
  localID: string;
  modelType: TType;
  type: 'LOCAL_MODEL';
}

export interface ModelRaw<TType extends string> {
  createdAt: Date;
  id: string;
  isDeleted: boolean;
  modelType: TType;
  type: 'MODEL';
  updatedAt: Date;
}
