import * as t from 'io-ts';

export default class LocalCache<T> {
  private tSerial: t.Type<T, string, string>;

  constructor(tSerial: t.Type<T, string, string>) {
    this.tSerial = tSerial;
  }

  public get(key: string): T | undefined {
    const value = localStorage.getItem(key);
    if (value === null) {
      return undefined;
    }

    const decoded = this.tSerial.decode(value);
    switch (decoded._tag) {
      case 'Left':
        return undefined;
      case 'Right':
        return decoded.right;
    }
  }

  public set(key: string, value: T): void {
    const encoded = this.tSerial.encode(value);
    localStorage.setItem(key, encoded);
  }
}
