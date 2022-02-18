import Fastify from 'fastify';

import { mongooseConnector } from './plugins/mongoose-connector';
import { routes } from './routes';

const fastify = Fastify({
  logger: true,
});

fastify.register(mongooseConnector);

fastify.register(routes);

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
