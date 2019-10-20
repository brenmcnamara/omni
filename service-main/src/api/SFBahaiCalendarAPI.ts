import { API as GSuiteAPI } from '@brendan9/api-gsuite';
import { DeconstructedPromise } from '@brendan9/foundation';
import { calendar_v3 } from 'googleapis';

export interface Configuration {
  dependencies: {
    GSuite: GSuiteAPI;
  };
}

const CALENDAR_ID =
  'sfbahai.org_efmgq0aq7p812o762igi86in3c@group.calendar.google.com';

export class API {
  private didStartConfiguring: boolean = false;
  private onFinishConfiguring = new DeconstructedPromise<Configuration>();

  public async genConfigure(configuration: Configuration): Promise<void> {
    if (this.didStartConfiguring) {
      throw Error('Cannot configure more than once');
    }

    this.didStartConfiguring = true;
    this.onFinishConfiguring.resolve(configuration);
  }

  public async genFetchCalendar(): Promise<calendar_v3.Schema$Calendar> {
    const { dependencies } = await this.onFinishConfiguring;
    return dependencies.GSuite.Calendar.genFetchCalendar(CALENDAR_ID);
  }
}
