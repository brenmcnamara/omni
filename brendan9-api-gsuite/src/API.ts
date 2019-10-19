import * as Calendar from './CalendarAPI';

import { DeconstructedPromise } from '@brendan9/foundation';
import { JWT } from 'google-auth-library';

interface ServiceCredentials {
  auth_provider_x509_cert_url: string;
  auth_uri: string;
  client_email: string;
  client_id: string;
  client_x509_cert_url: string;
  project_id: string;
  private_key: string;
  private_key_id: string;
  token_uri: string;
  type: 'service_account';
}

export interface Configuration {
  eventCalendarID: string;
  serviceCredentials: ServiceCredentials;
  scopes: string[];
  user: string;
}

export class API {
  private _Calendar = new Calendar.API();

  private didStartConfiguring: boolean = false;
  private onFinishConfiguring = new DeconstructedPromise<void>();

  public async genConfigure(configuration: Configuration): Promise<void> {
    if (this.didStartConfiguring) {
      throw Error('Cannot configure more than once');
    }

    this.didStartConfiguring = true;

    try {
      const jwt = new JWT(
        configuration.serviceCredentials.client_email,
        undefined,
        configuration.serviceCredentials.private_key,
        configuration.scopes,
        configuration.user,
        configuration.serviceCredentials.private_key_id,
      );

      await jwt.authorize();
      await this._Calendar.genConfigure({ jwt });

      this.onFinishConfiguring.resolve();
    } catch (error) {
      this.onFinishConfiguring.reject(error);
      throw error;
    }
  }

  public get Calendar(): Calendar.API {
    return this._Calendar;
  }
}
