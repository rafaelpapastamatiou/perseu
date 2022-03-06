import { Router } from 'express';

import { authRoutes } from '@main/http/routes/auth.routes';
import { stockRoutes } from './routes/stocks.routes';

const router = Router();

router.use('/', authRoutes);

router.use('/stocks', stockRoutes);

export { router };
