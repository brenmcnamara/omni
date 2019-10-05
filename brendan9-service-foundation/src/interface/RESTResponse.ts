export class RESTResponse<TResponsePayload> {
  private _payload: TResponsePayload;
  private _status: number;

  constructor(status: number, payload: TResponsePayload) {
    this._payload = payload;
    this._status = status;
  }

  public payload(): TResponsePayload {
    return this._payload;
  }

  public status(): number {
    return this._status;
  }

  static JSON<TResponsePayload extends Object>(
    json: TResponsePayload,
  ): RESTResponse<TResponsePayload> {
    return new RESTResponse(200, json);
  }

  static BadRequest<TErrorPayload extends Object>(json: TErrorPayload) {
    return new RESTResponse(400, json);
  }

  static Forbidden<TErrorPayload extends Object>(json: TErrorPayload) {
    return new RESTResponse(401, json);
  }

  static ResourceNotFound<TErrorPayload extends Object>(json: TErrorPayload) {
    return new RESTResponse(404, json);
  }

  static ServerError<TErrorPayload extends Object>(json: TErrorPayload) {
    return new RESTResponse(500, json);
  }
}
