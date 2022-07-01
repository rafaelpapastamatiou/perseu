import { Router } from 'express';
import { adaptExpressRoute } from '../adapters/express-route.adapter';
import { makeGetUserAssetsLogsDailyController } from '../factories/controllers/userAssetsLogs/get-user-assets-logs-daily.controller.factory';
import { makeGetUserAssetsProfitabilityLogsDailyController } from '../factories/controllers/userAssetsLogs/get-user-assets-profitability-logs-daily.controller.factory';
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

walletRoutes.get(
  '/equity/daily',
  adaptExpressRoute(makeGetUserAssetsLogsDailyController()),
);

walletRoutes.get(
  '/profitability/daily',
  adaptExpressRoute(makeGetUserAssetsProfitabilityLogsDailyController()),
);

export { walletRoutes };
