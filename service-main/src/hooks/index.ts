import Interface from '../interface';

import { Interface as InterfaceType } from '@brendan9/service-foundation';

export const Hooks = [
  Interface.endpoints.root.createHook(async () => {
    return InterfaceType.RESTResponse.Success({ hello: 'world' });
  }),
];
