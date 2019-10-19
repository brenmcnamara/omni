import CalendarAPI from './CalendarAPI';

import { Configuration } from './Configuration';

export default class API {
  private _Calendar: CalendarAPI;

  constructor(configuration: Configuration) {
    this._Calendar = new CalendarAPI(configuration);
  }

  public get CalendarAPI(): CalendarAPI {
    return this._Calendar;
  }
}
