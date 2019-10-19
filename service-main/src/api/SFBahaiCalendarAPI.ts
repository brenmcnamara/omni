import { API as GSuiteAPI } from '@brendan9/api-gsuite';
import { DeconstructedPromise } from '@brendan9/foundation';

export interface Configuration {
  dependency: {
    gsuite: GSuiteAPI;
  };
}

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
}
