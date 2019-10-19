import { Configuration } from './Configuration';

export default class CalendarAPI {
  private configuration: Configuration;

  constructor(configuration: Configuration) {
    this.configuration = configuration;
  }
}
