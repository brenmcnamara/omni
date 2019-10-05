import Interface from '../interface';

import { RequestJSONResponse } from '@nine-point/core-service-founation/interface';

const Hooks = [
  Interface.endpoints.root.createHook(async () => {
    return new RequestJSONResponse({ hello: 'world' });
  }),
];

export function configure() {
  const subscriptions = Hooks.map(h => h.run());

  return {
    remove: () => {
      subscriptions.forEach(s => s.remove());
    },
  };
}
