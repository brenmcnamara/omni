import { RESTEndpoint } from './RESTEndpoint';

export interface NestedEndpoints
  extends Array<NestedEndpoints | RESTEndpoint> {}

export interface RESTInterfaceOptions {
  endpoints: NestedEndpoints[];
}

export class RESTInterface {
  private options: RESTInterfaceOptions;

  static build(options: RESTInterfaceOptions) {
    return new RESTInterface(options);
  }

  constructor(options: RESTInterfaceOptions) {
    this.options = options;
  }

  public get endpoints(): NestedEndpoints {
    return this.options.endpoints;
  }
}
