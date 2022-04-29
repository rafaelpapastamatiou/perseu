import { Router } from 'express';

import { authRoutes } from '@main/http/routes/auth.routes';
import { stockRoutes } from './routes/stocks.routes';
import { adaptExpressMiddleware } from './adapters/express-middleware.adapter';
import { makeAuthMiddleware } from './factories/middlewares/auth.middleware.factory';
import { transactionsRoutes } from './routes/transactions.routes';

const router = Router();

router.use('/', authRoutes);

router.use(adaptExpressMiddleware(makeAuthMiddleware()));

router.use('/stocks', stockRoutes);

router.use('/transactions', transactionsRoutes);

export { router };
