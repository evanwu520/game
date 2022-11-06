

export class BaseAPIResponse {

  Message = '';

  constructor(params) {
    Object.assign(this, params);
  }
}

export class ErrorResponse extends BaseAPIResponse {
  constructor(params) {
    super(params);

    this.Message = params.message;
  }
}
