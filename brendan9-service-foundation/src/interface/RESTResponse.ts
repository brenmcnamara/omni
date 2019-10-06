export class RESTResponse<TResponsePayload> {
  private _contentType: string;
  private _payload: TResponsePayload;
  private _status: number;

  constructor(status: number, contentType: string, payload: TResponsePayload) {
    this._contentType = contentType;
    this._payload = payload;
    this._status = status;
  }

  public get contentType(): string {
    return this._contentType;
  }

  public get payload(): TResponsePayload {
    return this._payload;
  }

  public get status(): number {
    return this._status;
  }

  static Success<TResponsePayload extends Object>(
    json: TResponsePayload,
  ): RESTResponse<TResponsePayload> {
    return new RESTResponse(200, 'application/json', json);
  }

  static BadRequest<TErrorPayload extends Object>(json: TErrorPayload) {
    return new RESTResponse(400, 'application/json', json);
  }

  static Forbidden<TErrorPayload extends Object>(json: TErrorPayload) {
    return new RESTResponse(401, 'application/json', json);
  }

  static ResourceNotFound<TErrorPayload extends Object>(json: TErrorPayload) {
    return new RESTResponse(404, 'application/json', json);
  }

  static ServerError<TErrorPayload extends Object>(json: TErrorPayload) {
    return new RESTResponse(500, 'application/json', json);
  }
}
