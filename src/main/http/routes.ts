import { Router } from 'express';

import { authRoutes } from '@main/http/routes/auth.routes';

const router = Router();

router.use('/', authRoutes);

export { router };
