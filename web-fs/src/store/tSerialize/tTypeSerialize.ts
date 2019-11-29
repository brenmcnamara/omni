import * as t from 'io-ts';

import { Either } from 'fp-ts/lib/Either';

export default function tTypeSerialize<TProps extends t.Props>(props: TProps) {
  const tType = t.type(props);

  const is = (u: unknown): u is TProps => tType.is(u);

  const validate = (
    u: unknown,
    c: t.Context,
  ): Either<t.Errors, t.TypeOf<typeof tType>> => {
    if (typeof u !== 'string') {
      return t.failure(u, c);
    }

    let parsed: any;
    try {
      parsed = JSON.parse(u);
    } catch (error) {
      return t.failure(u, c);
    }

    return tType.validate(parsed, c);
  };

  const encode = (data: t.TypeOf<typeof tType>) => {
    return JSON.stringify(tType.encode(data));
  };

  return new t.Type<t.TypeOf<typeof tType>, string, unknown>(
    'tSerialized',
    is,
    validate,
    encode,
  );
}
