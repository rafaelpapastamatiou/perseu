import { FastifyPluginAsync } from 'fastify';
import { usersRoutes } from '@infra/http/routes/users.routes';

export const routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(usersRoutes, { prefix: '/users' });
};
