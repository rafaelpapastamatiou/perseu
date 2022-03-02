import { FastifyPluginAsync } from 'fastify';
import { authRoutes } from '@infra/http/routes/auth.routes';

export const routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(authRoutes);
};
