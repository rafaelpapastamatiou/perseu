import { Router } from 'express';

import { adaptExpressRoute } from '@main/http/adapters/express-route.adapter';
import { adaptExpressMiddleware } from '@main/http/adapters/express-middleware.adapter';
import { makeSignUpController } from '@main/http/factories/controllers/signup.controller.factory';
import { CreateUserDTO } from '@presentation/http/dtos/create-user.dto';
import { ValidationMiddleware } from '@presentation/http/middlewares/validation.middleware';
import { AuthenticateRequestDTO } from '@presentation/http/dtos/authentication.dto';
import { makeSignInController } from '../factories/controllers/signin.controller.factory';

const authRoutes = Router();

authRoutes.post(
  '/signup',
  adaptExpressMiddleware(new ValidationMiddleware(CreateUserDTO)),
  adaptExpressRoute(makeSignUpController()),
);

authRoutes.post(
  '/signin',
  adaptExpressMiddleware(new ValidationMiddleware(AuthenticateRequestDTO)),
  adaptExpressRoute(makeSignInController()),
);
export { authRoutes };
