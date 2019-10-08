import { RESTEndpoint } from './RESTEndpoint';

export interface RESTInterfaceOptions<
  TEndpoints extends { [P in keyof TEndpoints]: TEndpoints[P] }
> {
  endpoints: TEndpoints;
}

// TODO: Better typing.
export class RESTInterface<
  TEndpoints extends { [P in keyof TEndpoints]: TEndpoints[P] }
> {
  private options: RESTInterfaceOptions<TEndpoints>;

  public endpoints(): TEndpoints {
    return this.options.endpoints;
  }

  static build<TEndpoints extends { [P in keyof TEndpoints]: TEndpoints[P] }>(
    options: RESTInterfaceOptions<TEndpoints>,
  ) {
    return new RESTInterface(options);
  }

  constructor(options: RESTInterfaceOptions<TEndpoints>) {
    this.options = options;
  }
}
