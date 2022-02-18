type Body = Record<string, any>;
type Params = Record<string, any>;

export type HttpRequest<B extends Body = Body, P = Params> = {
  body: B;
  params: P;
  [key: string]: any;
};

export type HttpResponse = {
  statusCode: number;
  body: any;
};
