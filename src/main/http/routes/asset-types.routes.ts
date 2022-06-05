import { Router } from 'express';
import { adaptExpressRoute } from '../adapters/express-route.adapter';
import { makeListAssetTypesController } from '../factories/controllers/assetTypes/list-asset-types.controller.factory';

const assetTypesRoutes = Router();

assetTypesRoutes.get('/', adaptExpressRoute(makeListAssetTypesController()));

export { assetTypesRoutes };
