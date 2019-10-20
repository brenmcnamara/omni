import * as Calendar from './CalendarAPI';
import * as Firebase from './FirebaseAPI';
import * as fs from 'fs';
import * as GSuite from '@brendan9/api-gsuite';
import * as path from 'path';
import * as Reservation from './ReservationAPI';

import { DeconstructedPromise } from '@brendan9/foundation';

class API {
  private _Calendar = new Calendar.API();
  private _Firebase = new Firebase.API();
  private _GSuite = new GSuite.API();
  private _Reservation = new Reservation.API();

  private didStartConfiguring: boolean = false;
  private onFinishConfiguring = new DeconstructedPromise<void>();

  public async genConfigure(): Promise<void> {
    if (this.didStartConfiguring) {
      throw Error('Cannot configure api more than once');
    }

    this.didStartConfiguring = true;

    try {
      await Promise.all([
        this._Firebase.genConfigure(this.createFirebaseConfiguration()),
        this._GSuite.genConfigure(this.createGSuiteConfiguration()),
      ]);

      await this._Calendar.genConfigure(this.createCalendarConfiguration());

      await this._Reservation.genConfigure(
        this.createReservationConfiguration(),
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

  public get SFBahaiCalendar(): Calendar.API {
    return this._Calendar;
  }

  public get Reservation(): Reservation.API {
    return this._Reservation;
  }

  // FETCH CONFIGURATIONS

  private createFirebaseConfiguration(): Firebase.Configuration {
    const PATH_TO_FIREBASE = path.join(__dirname, '../../env/firebase');
    const PATH_TO_CONFIG = path.join(PATH_TO_FIREBASE, '/config.json');
    const PATH_TO_CREDS = path.join(PATH_TO_FIREBASE, '/credentials.json');

    const config = JSON.parse(fs.readFileSync(PATH_TO_CONFIG).toString());
    const credential = JSON.parse(fs.readFileSync(PATH_TO_CREDS).toString());

    return {
      credential,
      databaseURL: config.databaseURL,
    };
  }

  private createGSuiteConfiguration(): GSuite.Configuration {
    const PATH_TO_GSUITE = path.resolve(__dirname, '../../env/gsuite');
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

  private createCalendarConfiguration(): Calendar.Configuration {
    return { dependencies: { GSuite: this.GSuite } };
  }

  private createReservationConfiguration(): Reservation.Configuration {
    return {
      dependencies: {
        Firebase: this._Firebase,
        SFBahaiCalendar: this.SFBahaiCalendar,
      },
    };
  }
}

export default new API();
