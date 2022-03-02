import { Router } from 'express';

import { adaptExpressRoute } from '@main/http/adapters/express-route.adapter';
import { adaptExpressMiddleware } from '@main/http/adapters/express-middleware.adapter';
import { makeSignUpController } from '@infra/http/factories/controllers/signup.controller.factory';
import { CreateUserDTO } from '@presentation/dtos/create-user.dto';
import { ValidationMiddleware } from '@presentation/http/middlewares/validation.middleware';

const authRoutes = Router();

authRoutes.post(
  '/signup',
  adaptExpressMiddleware(new ValidationMiddleware(CreateUserDTO)),
  adaptExpressRoute(makeSignUpController()),
);

export { authRoutes };
