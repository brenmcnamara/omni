import { RESTGETEndpoint } from './RESTGETEndpoint';
import { RESTPOSTEndpoint } from './RESTPOSTEndpoint';

export type RESTEndpoint =
  | RESTGETEndpoint<any, any, any>
  | RESTPOSTEndpoint<any, any, any, any>;
