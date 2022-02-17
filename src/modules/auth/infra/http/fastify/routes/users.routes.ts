import { FastifyPluginAsync } from 'fastify';

import { adaptFastifyRoute } from '@main/http/adapters/fastify-route.adapter';
import { makeSignUpController } from '@modules/auth/infra/http/factories/controllers/signup.controller.factory';

export const usersRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/', adaptFastifyRoute(makeSignUpController()));
};
