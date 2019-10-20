import * as Firebase from '../FirebaseAPI';
import * as Calendar from '../CalendarAPI';
import * as ReservationRequest from './ReservationRequest.model';
import * as ReservationResponse from './ReservationResponse.model';

import { DeconstructedPromise } from '@brendan9/foundation';

export interface Configuration {
  dependencies: {
    Firebase: Firebase.API;
    SFBahaiCalendar: Calendar.API;
  };
}

type State = Configuration;

export interface Params$FetchReservationRequests {}

export interface Params$FetchReservationResponses {}

export class API {
  private didStartConfiguring: boolean = false;
  private onFinishConfiguring = new DeconstructedPromise<State>();

  public async genConfigure(configuration: Configuration): Promise<void> {
    if (this.didStartConfiguring) {
      throw Error('Cannot call genConfigure more than once');
    }

    this.didStartConfiguring = true;
    this.onFinishConfiguring.resolve(configuration);
  }

  public async genFetchReservationRequests(
    params: Params$FetchReservationRequests,
  ): Promise<ReservationRequest.Model[]> {
    const state = await this.onFinishConfiguring;

    const collection = await state.dependencies.Firebase.genCollection(
      'ReservationRequests',
    );

    const snapshot = await collection.where('isDeleted', '==', false).get();
    return snapshot.docs.map(
      doc =>
        new ReservationRequest.Model(doc.data() as ReservationRequest.ModelRaw),
    );
  }

  public async genFetchReservationResponses(
    params: Params$FetchReservationResponses,
  ): Promise<ReservationResponse.Model[]> {
    const state = await this.onFinishConfiguring;
    const collection = await state.dependencies.Firebase.genCollection(
      'ReservationResponses',
    );

    const snapshot = await collection.where('isDeleted', '==', false).get();
    return snapshot.docs.map(
      doc =>
        new ReservationResponse.Model(
          doc.data() as ReservationResponse.ModelRaw,
        ),
    );
  }
}
