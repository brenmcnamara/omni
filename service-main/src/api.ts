import * as fs from 'fs';
import * as path from 'path';

import {
  API as GSuiteAPI,
  Configuration as GSuiteConfiguration,
} from '@brendan9/api-gsuite';
import { DeconstructedPromise } from '@brendan9/foundation';

class API {
  private _GSuite = new GSuiteAPI();

  private didStartConfiguring: boolean = false;
  private onFinishConfiguring = new DeconstructedPromise<void>();

  public async genConfigure(): Promise<void> {
    if (this.didStartConfiguring) {
      throw Error('Cannot configure api more than once');
    }

    this.didStartConfiguring = true;

    try {
      await this._GSuite.genConfigure(this.createGSuiteConfiguration());
      this.onFinishConfiguring.resolve();
    } catch (error) {
      this.onFinishConfiguring.reject(error);
    }
  }

  private createGSuiteConfiguration(): GSuiteConfiguration {
    const PATH_TO_GSUITE = path.resolve(__dirname, '../../env/main/gsuite');
    const PATH_TO_CONFIG = path.resolve(PATH_TO_GSUITE, 'config.json');
    const PATH_TO_CREDS = path.resolve(PATH_TO_GSUITE, 'credentials.json');

    // TODO: TYPE CHECKING OF JSON

    const config = JSON.parse(fs.readFileSync(PATH_TO_CONFIG).toString());
    const creds = JSON.parse(fs.readFileSync(PATH_TO_CREDS).toString());

    const configuration: GSuiteConfiguration = {
      ...config,
      serviceCredentials: creds,
    };

    return configuration;
  }
}

export default new API();
