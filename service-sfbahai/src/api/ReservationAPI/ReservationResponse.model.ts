import * as Core from '@brendan9/model';
import * as ReservationRequest from './ReservationRequest.model';
import * as t from 'io-ts';

export const UNIVERSE = 'SFBahai';
export const MODEL_TYPE = 'ReservationRequest';

export type Ref = Core.Ref<typeof MODEL_TYPE>;

export const tRef = Core.tRef(MODEL_TYPE);

export const tStub = t.type({
  notes: t.string,
  requestRef: ReservationRequest.tRef,
  responderEmail: t.string,
  responderName: t.string,
  responseStatus: t.union([t.literal('ACCEPT'), t.literal('DECLINE')]),
});

export const tModel = t.intersection([Core.tModelRaw(MODEL_TYPE), tStub]);

export type ModelRaw = t.TypeOf<typeof tModel>;

export class Model extends Core.Model<typeof MODEL_TYPE, ModelRaw> {
  static createRef(refID: string) {
    return { refID, refType: MODEL_TYPE, type: 'REF' };
  }

  get notes(): string {
    return this.raw.notes;
  }

  get requestRef(): ReservationRequest.Ref {
    return this.raw.requestRef;
  }

  get responderEmail(): string {
    return this.raw.responderEmail;
  }

  get responderName(): string {
    return this.raw.responderName;
  }

  get responseStatus(): 'ACCEPT' | 'DECLINE' {
    return this.raw.responseStatus;
  }
}
