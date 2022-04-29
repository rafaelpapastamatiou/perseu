import { Jwt } from '@infra/jwt';
import { AuthMiddleware } from '@presentation/http/middlewares/auth.middleware';

export const makeAuthMiddleware = (): AuthMiddleware => {
  const jwt = new Jwt();

  const authMiddleware = new AuthMiddleware(jwt);

  return authMiddleware;
};
