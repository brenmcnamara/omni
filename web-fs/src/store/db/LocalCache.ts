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

    let parsed: T;
    try {
      parsed = parse(value);
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
    const serialized = serialize(this.tSerial.encode(value));
    localStorage.setItem(`${this.namespace}.${key}`, serialized);
  }

  public remove(key: string): void {
    localStorage.removeItem(`${this.namespace}.${key}`);
  }
}

function serialize(data: any): string {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    // NOTE: We are making an assumption that a date is not a nested
    // type anywhere within this array.
    return JSON.stringify(data);
  }

  const json: any = {};

  for (const key of Object.keys(data)) {
    const value = data[key];
    if (value instanceof Date) {
      json[`${key}$Date`] = value.toISOString();
    } else {
      json[key] = value;
    }
  }
  return JSON.stringify(json);
}

function parse(serial: string): any {
  const json: any = JSON.parse(serial);
  if (!json || typeof json !== 'object' || Array.isArray(json)) {
    return json;
  }

  const data: any = {};

  for (const key of Object.keys(json)) {
    if (key.endsWith('$Date')) {
      const date = new Date(json[key]);
      if (isNaN(date.getTime())) {
        throw Error('Invalid serialized date');
      }

      data[key.slice(0, key.length - '$Date'.length)] = date;
    } else {
      data[key] = json[key];
    }
  }

  return data;
}
