import { Router } from 'express';

import { authRoutes } from '@main/http/routes/auth.routes';
import { assetsRoutes } from './routes/assets.routes';
import { adaptExpressMiddleware } from './adapters/express-middleware.adapter';
import { makeAuthMiddleware } from './factories/middlewares/auth.middleware.factory';
import { transactionsRoutes } from './routes/transactions.routes';
import { exchangesRoutes } from './routes/exchanges.routes';
import { assetTypesRoutes } from './routes/asset-types.routes';
import { walletRoutes } from './routes/wallet.routes';
import { userAssetsRoutes } from './routes/user-assets.routes';

const router = Router();

router.use('/', authRoutes);

router.use(adaptExpressMiddleware(makeAuthMiddleware()));

router.use('/assets', assetsRoutes);

router.use('/transactions', transactionsRoutes);

router.use('/exchanges', exchangesRoutes);

router.use('/assetTypes', assetTypesRoutes);

router.use('/wallet', walletRoutes);

router.use('/userAssets', userAssetsRoutes);

export { router };
