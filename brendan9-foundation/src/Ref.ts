export interface Ref<TType extends string> {
  refID: string;
  refType: TType;
  type: 'REF';
}
