import * as t from 'io-ts';
import root from './root.endpoint';

import { Interface } from '@brendan9/service-foundation';

const { RESTInterface } = Interface;

export default RESTInterface.build({
  endpoints: { root },
});
