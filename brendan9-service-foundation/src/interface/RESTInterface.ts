import { RESTEndpoint } from './RESTEndpoint';

export interface RESTInterfaceOptions {
  endpoints: RESTEndpoint<any, any>[];
}

export class RESTInterface {
  private options: RESTInterfaceOptions;

  static build(options: RESTInterfaceOptions) {
    return new RESTInterface(options);
  }

  constructor(options: RESTInterfaceOptions) {
    this.options = options;
  }
}
