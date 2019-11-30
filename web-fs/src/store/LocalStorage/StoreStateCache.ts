import LocalCache from './LocalCache';
import memoize from '../../memoize';

import { StoreState, tStoreStateSerialize } from '../Store';

const VERSION = '1.0';

// NOTE: Need to memoize this since local cache cannot be initialized too soon.
const getCache = memoize(
  () => new LocalCache<StoreState>(`v${VERSION}`, tStoreStateSerialize),
);

export default {
  get: () => getCache().get('StoreState'),
  set: (storeState: StoreState) => getCache().set('StoreState', storeState),
};
