import { DeconstructedPromise } from '@brendan9/foundation';

export interface Configuration {}

export class CalendarAPI {
  private didStartConfiguring: boolean = false;
  private onFinishConfiguring = new DeconstructedPromise<void>();

  public async genConfigure(configuration: Configuration): Promise<void> {
    if (this.didStartConfiguring) {
      throw Error('Cannot configure CalendarAPI more than once');
    }

    this.onFinishConfiguring.resolve();
  }
}
