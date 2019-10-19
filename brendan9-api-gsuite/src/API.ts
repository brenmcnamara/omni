import { CalendarAPI } from './CalendarAPI';
import { DeconstructedPromise } from '@brendan9/foundation';

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
  private _CalendarAPI: CalendarAPI;

  private didStartConfiguring: boolean = false;
  private onFinishConfiguring = new DeconstructedPromise<void>();

  constructor() {
    this._CalendarAPI = new CalendarAPI();
  }

  public async genConfigure(configuration: Configuration): Promise<void> {
    if (this.didStartConfiguring) {
      throw Error('Cannot configure more than once');
    }

    this.didStartConfiguring = true;

    try {
      await this._CalendarAPI.genConfigure({});
      this.onFinishConfiguring.resolve();
    } catch (error) {
      this.onFinishConfiguring.reject(error);
    }
  }

  public get CalendarAPI(): CalendarAPI {
    return this._CalendarAPI;
  }
}
