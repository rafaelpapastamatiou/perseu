import express, { Express } from 'express';
import cors from 'cors';

import { router } from './routes';
import { setupRedisClient } from '@infra/redis';
import { setupMongoose } from '@infra/database/mongodb/mongo-helper';
import { setupSwagger } from './swagger';

export async function setupApp(): Promise<Express> {
  const app = express();

  app.use(express.json());
  app.use(cors());

  if (process.env.NODE_ENV !== 'test') {
    await setupMongoose();
    await setupRedisClient();
    setupSwagger(app);
  }

  app.use(router);

  return app;
}
