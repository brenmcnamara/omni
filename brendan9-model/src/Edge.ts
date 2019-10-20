import { Ref } from './Ref';

export interface Edge<
  TType extends string,
  TFromType extends string,
  TToType extends string
> {
  edgeType: TType;
  fromRef: Ref<TFromType>;
  toRef: Ref<TToType>;
  type: 'EDGE';
}
