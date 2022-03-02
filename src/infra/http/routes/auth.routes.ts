import { FastifyPluginAsync } from 'fastify';

import { adaptFastifyRoute } from '@main/http/adapters/fastify-route.adapter';
import { makeSignUpController } from '@infra/http/factories/controllers/signup.controller.factory';
import { CreateUserDTO } from '@presentation/dtos/create-user.dto';

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post(
    '/signup',
    adaptFastifyRoute(makeSignUpController(), CreateUserDTO),
  );
};
