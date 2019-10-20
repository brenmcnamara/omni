import * as Firebase from '../FirebaseAPI';
import * as Calendar from '../CalendarAPI';
import * as ReservationRequest from './ReservationRequest.model';
import * as ReservationResponse from './ReservationResponse.model';

import { DeconstructedPromise } from '@brendan9/foundation';
import { firestore } from 'firebase-admin';

export interface Configuration {
  dependencies: {
    Firebase: Firebase.API;
    SFBahaiCalendar: Calendar.API;
  };
}

type State = Configuration;

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

  public async genQueryReservationRequest(
    cb: (collection: firestore.CollectionReference) => firestore.Query,
  ): Promise<ReservationRequest.Model[]> {
    const state = await this.onFinishConfiguring;
    const collection = await state.dependencies.Firebase.genCollection(
      'ReservationRequests',
    );

    const snapshot = await cb(collection).get();

    return snapshot.docs.map(doc => {
      const data = doc.data();
      // @ts-ignore
      const raw: ReservationRequest.ModelRaw = {
        ...data,
        createdAt: (data.createdAt as firestore.Timestamp).toDate(),
        eventEndAt: (data.eventEndAt as firestore.Timestamp).toDate(),
        eventStartAt: (data.eventStartAt as firestore.Timestamp).toDate(),
        updatedAt: (data.updatedAt as firestore.Timestamp).toDate(),
      };

      return new ReservationRequest.Model(raw);
    });
  }

  public async genFetchReservationRequest(
    id: string,
  ): Promise<ReservationRequest.Model | null> {
    const state = await this.onFinishConfiguring;

    const collection = await state.dependencies.Firebase.genCollection(
      'ReservationRequests',
    );

    const doc = await collection.doc(id).get();
    const data = doc.data();
    if (!doc.exists || !data) {
      return null;
    }
    // @ts-ignore
    const raw: ReservationRequest.ModelRaw = {
      ...data,
      createdAt: (data.createdAt as firestore.Timestamp).toDate(),
      eventEndAt: (data.eventEndAt as firestore.Timestamp).toDate(),
      eventStartAt: (data.eventStartAt as firestore.Timestamp).toDate(),
      updatedAt: (data.updatedAt as firestore.Timestamp).toDate(),
    };
    return new ReservationRequest.Model(raw);
  }

  public async genQueryReservationResponses(
    cb: (collection: firestore.CollectionReference) => firestore.Query,
  ): Promise<ReservationResponse.Model[]> {
    const state = await this.onFinishConfiguring;
    const collection = await state.dependencies.Firebase.genCollection(
      'ReservationResponses',
    );

    const snapshot = await cb(collection).get();

    return snapshot.docs.map(doc => {
      const data = doc.data();
      // @ts-ignore
      const raw: ReservationResponse.Model = {
        ...data,
        createdAt: (data.createdAt as firestore.Timestamp).toDate(),
        updatedAt: (data.updatedAt as firestore.Timestamp).toDate(),
      };
      return new ReservationResponse.Model(raw);
    });
  }

  public async genFetchReservationResponse(
    id: string,
  ): Promise<ReservationResponse.Model | null> {
    const state = await this.onFinishConfiguring;

    const collection = await state.dependencies.Firebase.genCollection(
      'ReservationResponses',
    );

    const doc = await collection.doc(id).get();
    const data = doc.data();
    if (!doc.exists || !data) {
      return null;
    }
    // @ts-ignore
    const raw: ReservationResponse.ModelRaw = {
      ...data,
      createdAt: (data.createdAt as firestore.Timestamp).toDate(),
      updatedAt: (data.updatedAt as firestore.Timestamp).toDate(),
    };
    return new ReservationResponse.Model(raw);
  }
}
