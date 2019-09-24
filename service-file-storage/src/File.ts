import * as t from 'io-ts';

import { FileContentType } from './FileContents';

export const UNIVERSE = '_';
export const STUB_TYPE = 'INTERFACE';
export const NAME = 'File';

export function tFile<TContentType extends FileContentType>(
  contentType: TContentType,
) {
  return t.type({
    contentType: t.literal(contentType),
    id: t.string,
    name: t.string,
  });
}

export interface File<TContentType extends FileContentType> {
  contentType: TContentType;
  id: string;
  name: string;
}
