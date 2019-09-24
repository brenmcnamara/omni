import * as Core from '../../schema/core';

import { File } from './File';
import { FileContents, FileContentType } from './FileContents';
import { Transaction } from '../database';

export interface CreateFileOptions {
  contents: FileContents<FileContentType>;
  name: string;
  tags: string[];
}

export interface CreateFileTransactionResult {
  file: Core.Model<string, Object> & File<FileContentType>;
}

export class CreateFile extends Transaction<CreateFileTransactionResult> {
  private options: CreateFileOptions;

  constructor(options: CreateFileOptions) {
    super();
    this.options = options;
  }
}
