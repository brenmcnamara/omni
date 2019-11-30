import * as t from 'io-ts';
import LocalCache from './LocalCache';

import { useEffect, useMemo, useState } from 'react';

type Setter<T> = (val: T) => void;

const namespaceToCache: { [namespace: string]: LocalCache<any> } = {};

const setterSlaves: { [namespace: string]: Array<Setter<unknown>> } = {};

// TODO: Is there a way to use this setter master / slave pattern with just
// the useState hook?
function setterMaster(namespace: string, version: string, value: unknown) {
  const cache = namespaceToCache[namespace];
  if (!cache) {
    throw Error(`Expecting cache to exist for namespace: ${namespace}`);
  }

  cache.set(version, value);

  const setters = setterSlaves[namespace];
  if (!setters) {
    return;
  }
  setters.forEach(setter => setter(value));
}

export default function useLocalStorage<T>(
  namespace: string,
  version: string,
  tSerial: t.Type<T>,
): [T | undefined, Setter<T>] {
  const cache = useMemo(() => {
    let cache = namespaceToCache[namespace];

    if (cache && cache.tSerial !== tSerial) {
      throw Error(
        `Trying to change storage serializer for namespace: ${namespace}`,
      );
    } else if (!cache) {
      cache = new LocalCache(namespace, tSerial);
    }

    namespaceToCache[namespace] = cache;
    return cache as LocalCache<T>;
  }, [namespace]);

  const [value, setValue] = useState(cache.get(version));

  useEffect(
    function subscribeToStorageChanges() {
      // Keep the namespace in this local scope in case it changes.
      const _namespace = namespace;
      const setters = setterSlaves[_namespace] || [];
      // @ts-ignore
      setters.push(setValue);
      setterSlaves[namespace] = setters;

      // Remove the setter from the list of slave setters when unsubscribing.
      return () => {
        const setters = setterSlaves[_namespace] || [];
        // @ts-ignore
        const index = setters.indexOf(setValue);
        if (index >= 0) {
          setters.splice(index, 1);
        }
      };
    },
    [namespace, setValue],
  );

  return [value, val => setterMaster(namespace, version, val)];
}
