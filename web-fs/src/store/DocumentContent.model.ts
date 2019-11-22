import { ModelLocalRaw, ModelRaw, Ref } from './core';

export const MODEL_TYPE = 'DocumentContent';

export type DocumentContent = Ref<typeof MODEL_TYPE>;

export interface DocumentContentLocalJSON
  extends ModelLocalRaw<typeof MODEL_TYPE> {}

export interface DocumentContentJSON extends ModelRaw<typeof MODEL_TYPE> {}
