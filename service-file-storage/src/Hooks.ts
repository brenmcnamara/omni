import * as Core from '../../schema/core';

import { File } from './File';
import { FileContentType } from './FileContents';

interface Subscription {
  remove: () => void;
}

class Hook<T> {
  subscribe(cb: (value: T) => Promise<void>): Subscription {
    return { remove: () => {} };
  }
}

class DidCreateFileHookBuilder<
  TModel extends Core.Model<string, any>,
  TModelClass extends Core.ModelClass<string, any, TModel>
> {
  public ofType(ModelClass: TModelClass): this {
    return this;
  }

  public withTags(tags: string[]): this {
    return this;
  }

  public createHook(): Hook<TModel> {
    return new Hook();
  }
}

export function DidCreateFile<
  TModel extends Core.Model<string, any>,
  TModelClass extends Core.ModelClass<string, any, TModel>
>(): DidCreateFileHookBuilder<TModel, TModelClass> {
  return new DidCreateFileHookBuilder();
}
