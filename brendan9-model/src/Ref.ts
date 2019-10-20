import * as t from 'io-ts';

export interface Ref<TType extends string> {
  refID: string;
  refType: TType;
  type: 'REF';
}

export function tRef<TType extends string>(type: TType) {
  return t.type({
    refID: t.string,
    refType: t.literal(type),
    type: t.literal('REF'),
  });
}
