import { Request, NextFunction, Response } from 'express';

import { Middleware } from '@presentation/http/protocols/middleware';
import { HttpRequest } from '@presentation/http/protocols/http';

export const adaptExpressMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request: HttpRequest = {
      accessToken: req.headers?.['x-access-token'],
      ...(req.headers || {}),
      body: req.body,
      params: req.params,
    };

    const httpResponse = await middleware.handle(request);

    if (httpResponse.statusCode === 200) {
      Object.assign(req.body, httpResponse.body);

      next();
    } else {
      return res.status(httpResponse.statusCode).json(httpResponse.body);
    }
  };
};
