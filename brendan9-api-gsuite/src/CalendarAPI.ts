import unwrapGaxiosData from './unwrapGaxiosData';

import { DeconstructedPromise } from '@brendan9/foundation';
import { calendar_v3, google } from 'googleapis';
import { JWT } from 'google-auth-library';

export interface Configuration {
  jwt: JWT;
}

export class CalendarAPI {
  private calendar = google.calendar('v3');
  private didFinishConfiguring: boolean = false;
  private onFinishConfiguring = new DeconstructedPromise<Configuration>();

  public async genConfigure(configuration: Configuration): Promise<void> {
    if (this.didFinishConfiguring) {
      throw Error('Cannot configure CalendarAPI more than once');
    }

    this.didFinishConfiguring = true;

    try {
      await configuration.jwt.authorize();
      this.onFinishConfiguring.resolve(configuration);
    } catch (error) {
      this.onFinishConfiguring.reject(error);
    }
  }

  public async genFetchCalendars(): Promise<calendar_v3.Schema$CalendarList> {
    const configuration = await this.onFinishConfiguring;

    const response = await this.calendar.calendarList.list({
      auth: configuration.jwt,
    });

    return unwrapGaxiosData(response);
  }
}
