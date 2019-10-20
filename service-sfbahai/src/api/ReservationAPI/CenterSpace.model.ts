import * as Core from '@brendan9/model';
import * as t from 'io-ts';

export const UNIVERSE = 'SFBahai';
export const MODEL_TYPE = 'CenterSpace';

export type Ref = Core.Ref<typeof MODEL_TYPE>;

export const tRef = Core.tRef(MODEL_TYPE);

export const tStub = t.type({
  name: t.string,
});

export const tModel = t.intersection([Core.tModelRaw(MODEL_TYPE), tStub]);

export type ModelRaw = t.TypeOf<typeof tModel>;

export class Model extends Core.Model<typeof MODEL_TYPE, ModelRaw> {
  static createRef(refID: string) {
    return { refID, refType: MODEL_TYPE, type: 'REF' };
  }

  get name(): string {
    return this.raw.name;
  }
}
