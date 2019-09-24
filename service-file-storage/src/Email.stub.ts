import * as t from 'io-ts';

import { tFile } from './File';

export const UNIVERSE = '_';
export const STUB_TYPE = 'MODEL';
export const NAME = 'Email';

export const tStub = t.intersection([
  tFile('text/html'),
  t.type({ sender: t.string }),
]);
