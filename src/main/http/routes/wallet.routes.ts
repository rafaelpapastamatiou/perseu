import { Router } from 'express';
import { adaptExpressRoute } from '../adapters/express-route.adapter';
import { makeGetUserWalletCompositionByAssetTypeController } from '../factories/controllers/wallet/get-user-wallet-composition-by-asset-type.controller.factory';
import { makeGetUserWalletCompositionController } from '../factories/controllers/wallet/get-user-wallet-composition.controller.factory';

const walletRoutes = Router();

walletRoutes.get(
  '/composition',
  adaptExpressRoute(makeGetUserWalletCompositionController()),
);

walletRoutes.get(
  '/compositionByType',
  adaptExpressRoute(makeGetUserWalletCompositionByAssetTypeController()),
);

export { walletRoutes };
