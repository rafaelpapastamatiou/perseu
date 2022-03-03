import express, { Express } from 'express';
import cors from 'cors';

import { router } from './routes';

export async function setupApp(): Promise<Express> {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(router);

  return app;
}
