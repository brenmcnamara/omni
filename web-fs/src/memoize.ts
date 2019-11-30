type Maybe<T> = { type: 'UNDEFINED' } | { type: 'DEFINED'; value: T };

export default function memoize<TReturn>(cb: () => TReturn): () => TReturn {
  let value: Maybe<TReturn> = { type: 'UNDEFINED' };

  return () => {
    if (value.type === 'UNDEFINED') {
      value = { type: 'DEFINED', value: cb() };
    }

    return value.value;
  };
}
