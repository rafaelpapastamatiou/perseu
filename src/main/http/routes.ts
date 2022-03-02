import { Router } from 'express';

import { authRoutes } from '@infra/http/routes/auth.routes';

const router = Router();

router.use('/', authRoutes);

export { router };
