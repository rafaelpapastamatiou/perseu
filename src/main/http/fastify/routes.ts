import { FastifyPluginAsync } from 'fastify';
import { usersRoutes } from '@modules/auth/infra/http/fastify/routes/users.routes';

export const routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(usersRoutes, { prefix: '/users' });
};
