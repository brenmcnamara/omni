import * as t from 'io-ts';

export default class LocalCache<T> {
  private namespace: string;
  private tSerial: t.Type<T>;

  constructor(namespace: string, tSerial: t.Type<T>) {
    this.namespace = namespace;
    this.tSerial = tSerial;
  }

  public get(key: string): T | undefined {
    const value = localStorage.getItem(`${this.namespace}.${key}`);
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

  public set(key: string, value: T): void {
    const encoded = JSON.stringify(this.tSerial.encode(value));
    localStorage.setItem(`${this.namespace}.${key}`, encoded);
  }

  public remove(key: string): void {
    localStorage.removeItem(`${this.namespace}.${key}`);
  }
}
