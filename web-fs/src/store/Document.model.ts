import { ModelLocalRaw, ModelRaw, Ref } from './core';

export const MODEL_TYPE = 'Document';

export type DocumentRef = Ref<typeof MODEL_TYPE>;

export interface DocumentLocalJSON extends ModelLocalRaw<typeof MODEL_TYPE> {
  name: string;
  groups: string[];
}

export interface DocumentJSON extends ModelRaw<typeof MODEL_TYPE> {
  name: string;
  groups: string[];
}
