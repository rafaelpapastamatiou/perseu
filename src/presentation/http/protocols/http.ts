type Body = Record<string, any>;
type Params = Record<string, any>;
type Query = Record<string, any>;

export type HttpRequest<B extends Body = Body, P = Params, Q = Query> = {
  body?: B;
  params?: P;
  query?: Q;
  headers?: Record<string, unknown>;
  userId?: string;
  [key: string]: any;
};

export type HttpResponse<B> = {
  statusCode: number;
  body?: B;
  [key: string]: any;
};
