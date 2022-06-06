import { Router } from 'express';
import { adaptExpressRoute } from '../adapters/express-route.adapter';
import { makeGetUserWalletCompositionController } from '../factories/controllers/wallet/get-user-wallet-composition.controller.factory';

const walletRoutes = Router();

walletRoutes.get(
  '/composition',
  adaptExpressRoute(makeGetUserWalletCompositionController()),
);

export { walletRoutes };
