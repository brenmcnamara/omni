import * as t from 'io-ts';

export default class LocalCache<TProps extends t.Props> {
  private tSerial: t.TypeC<TProps>;

  constructor(tSerial: t.TypeC<TProps>) {
    this.tSerial = tSerial;
  }

  public get(key: string): t.TypeOf<t.TypeC<TProps>> | undefined {
    const value = localStorage.getItem(key);
    if (value === null) {
      return undefined;
    }

    let parsed: string;
    try {
      parsed = JSON.parse(value);
    } catch (error) {
      return undefined;
    }

    const decoded = this.tSerial.decode(parsed);
    switch (decoded._tag) {
      case 'Left':
        return undefined;
      case 'Right':
        return decoded.right;
    }
  }

  public set(key: string, value: t.TypeOf<t.TypeC<TProps>>): void {
    const encoded = JSON.stringify(this.tSerial.encode(value));
    localStorage.setItem(key, encoded);
  }
}
