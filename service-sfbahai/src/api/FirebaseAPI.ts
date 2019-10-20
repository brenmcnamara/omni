import * as FirebaseAdmin from 'firebase-admin';

import { DeconstructedPromise } from '@brendan9/foundation';

export interface Configuration {
  credential: FirebaseAdmin.ServiceAccount;
  databaseURL: string;
}

interface State {
  db: FirebaseAdmin.firestore.Firestore;
}

export class API {
  private didStartConfiguring: boolean = false;
  private onFinishConfiguring = new DeconstructedPromise<State>();

  public async genConfigure(configuration: Configuration): Promise<void> {
    if (this.didStartConfiguring) {
      throw Error('Cannot call genConfigure more than once');
    }

    this.didStartConfiguring = true;

    try {
      FirebaseAdmin.initializeApp({
        credential: FirebaseAdmin.credential.cert(configuration.credential),
        databaseURL: configuration.databaseURL,
      });

      this.onFinishConfiguring.resolve({ db: FirebaseAdmin.firestore() });
    } catch (error) {
      this.onFinishConfiguring.reject(error);
      throw error;
    }
  }

  public async genCollection(
    collectionName: string,
  ): Promise<FirebaseAdmin.firestore.CollectionReference> {
    const state = await this.onFinishConfiguring;

    return state.db.collection(collectionName);
  }
}
