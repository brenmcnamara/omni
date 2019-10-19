import * as fs from 'fs';
import * as GSuite from '@brendan9/api-gsuite';
import * as path from 'path';
import * as SFBahaiCalendar from './SFBahaiCalendarAPI';

import { DeconstructedPromise } from '@brendan9/foundation';

class API {
  private _GSuite = new GSuite.API();
  private _SFBahaiCalendar = new SFBahaiCalendar.API();

  private didStartConfiguring: boolean = false;
  private onFinishConfiguring = new DeconstructedPromise<void>();

  public async genConfigure(): Promise<void> {
    if (this.didStartConfiguring) {
      throw Error('Cannot configure api more than once');
    }

    this.didStartConfiguring = true;

    try {
      // TODO: Could create a dependency graph of apis and automate
      // the configuration.

      await this._GSuite.genConfigure(this.createGSuiteConfiguration());
      await this._SFBahaiCalendar.genConfigure(
        this.createSFBahaiCalendarConfiguration(),
      );

      this.onFinishConfiguring.resolve();
    } catch (error) {
      this.onFinishConfiguring.reject(error);
      throw error;
    }
  }

  public get GSuite(): GSuite.API {
    return this._GSuite;
  }

  public get SFBahaiCalendar(): SFBahaiCalendar.API {
    return this._SFBahaiCalendar;
  }

  // FETCH CONFIGURATIONS

  private createGSuiteConfiguration(): GSuite.Configuration {
    const PATH_TO_GSUITE = path.resolve(__dirname, '../../../env/main/gsuite');
    const PATH_TO_CONFIG = path.resolve(PATH_TO_GSUITE, 'config.json');
    const PATH_TO_CREDS = path.resolve(PATH_TO_GSUITE, 'credentials.json');

    // TODO: TYPE CHECKING OF JSON

    const config = JSON.parse(fs.readFileSync(PATH_TO_CONFIG).toString());
    const creds = JSON.parse(fs.readFileSync(PATH_TO_CREDS).toString());

    const configuration: GSuite.Configuration = {
      ...config,
      serviceCredentials: creds,
    };

    return configuration;
  }

  private createSFBahaiCalendarConfiguration(): SFBahaiCalendar.Configuration {
    return { dependency: { gsuite: this.GSuite } };
  }
}

export default new API();
