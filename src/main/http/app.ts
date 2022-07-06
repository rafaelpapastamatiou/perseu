import 'reflect-metadata';
import express, { Express } from 'express';
import cors from 'cors';

import { setupRedisClient } from '@infra/redis';
import { setupMongoose } from '@infra/database/mongodb/mongo-helper';
import { setupSwagger } from './swagger';
import { setupRabbitMQ } from '@infra/rabbitmq/rabbitmq';

export async function setupApp(): Promise<Express> {
  const app = express();

  app.use(express.json());
  app.use(cors());

  if (process.env.NODE_ENV !== 'test') {
    await setupMongoose();
    await setupRedisClient();
    await setupRabbitMQ();
    setupSwagger(app);
  }

  const { router } = await import('./routes');

  app.use(router);

  return app;
}
