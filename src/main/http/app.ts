import express, { Express } from 'express';
import cors from 'cors';

import { router } from './routes';
import { setupRedisClient } from '@infra/redis';

export async function setupApp(): Promise<Express> {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(router);

  if (process.env.NODE_ENV !== 'test') {
    await setupRedisClient();
  }

  return app;
}
