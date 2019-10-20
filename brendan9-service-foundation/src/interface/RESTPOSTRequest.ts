export interface RESTPOSTRequest<TParams, TQuery, TBody> {
  body: TBody;
  params: TParams;
  query: TQuery;
}
