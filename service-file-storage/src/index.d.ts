import * as Hooks from './Hooks';
import * as Transactions from './Transactions';

import { File } from './File';
import { FileContents, FileContentType } from './FileContents';

export { Hooks };
export { Transactions };

export function genFetchFileContents<TContentType extends FileContentType>(
  file: File<TContentType>,
): Promise<FileContents<TContentType>>;
