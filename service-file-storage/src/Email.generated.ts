import * as Core from '../../schema/core';
import * as Email from './Email.stub';
import * as t from 'io-ts';

export type Stub = t.TypeOf<typeof Email.tStub>;

export class Model extends Core.Model<typeof Email.NAME, Stub> {
  static get modelType(): typeof Email.NAME {
    return Email.NAME;
  }

  get name(): string {
    return this.raw.name;
  }

  get sender(): string {
    return this.raw.sender;
  }
}
