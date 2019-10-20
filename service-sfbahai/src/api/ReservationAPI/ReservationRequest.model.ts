import * as CenterSpace from './CenterSpace.model';
import * as Core from '@brendan9/model';
import * as t from 'io-ts';

export const UNIVERSE = 'SFBahai';
export const MODEL_TYPE = 'ReservationRequest';

export type Ref = Core.Ref<typeof MODEL_TYPE>;

export const tRef = Core.tRef(MODEL_TYPE);

export const tStub = t.type({
  centerSpaceRef: Core.tRef(CenterSpace.MODEL_TYPE),
  eventDescription: t.string,
  eventEndAt: Core.tDate,
  eventName: t.string,
  eventStartAt: Core.tDate,
  requestorEmail: t.string,
  requestorFullName: t.string,
});

export const tModel = t.intersection([Core.tModelRaw(MODEL_TYPE), tStub]);

export type ModelRaw = t.TypeOf<typeof tModel>;

export class Model extends Core.Model<typeof MODEL_TYPE, ModelRaw> {
  static createRef(refID: string) {
    return { refID, refType: MODEL_TYPE, type: 'REF' };
  }

  get centerSpaceRef(): CenterSpace.Ref {
    return this.raw.centerSpaceRef;
  }

  get eventDescription(): string {
    return this.raw.eventDescription;
  }

  get eventEndAt(): Date {
    return this.raw.eventEndAt;
  }

  get eventName(): string {
    return this.raw.eventName;
  }

  get eventStartAt(): Date {
    return this.raw.eventStartAt;
  }

  get requestorEmail(): string {
    return this.raw.requestorEmail;
  }

  get requestorFullName(): string {
    return this.raw.requestorFullName;
  }
}
