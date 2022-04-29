import { Request, NextFunction, Response } from 'express';

import { Middleware } from '@presentation/http/protocols/middleware';
import { HttpRequest } from '@presentation/http/protocols/http';

export const adaptExpressMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request: HttpRequest = {
      headers: req.headers || {},
      body: req.body,
      params: req.params,
      query: req.query,
    };

    const httpResponse = await middleware.handle(request);

    if (httpResponse.statusCode === 200) {
      const { body, params, statusCode: _code, ...data } = httpResponse;

      Object.assign(req.body, body);
      Object.assign(req.params, params);
      Object.assign(req, data);

      next();
    } else {
      return res.status(httpResponse.statusCode).json(httpResponse.body);
    }
  };
};
