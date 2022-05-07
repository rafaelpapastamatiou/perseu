import { Router } from 'express';
import { adaptExpressRoute } from '../adapters/express-route.adapter';
import { makeListExchangesController } from '../factories/controllers/exchanges/list-exchanges.controller.factory';

const exchangesRoutes = Router();

exchangesRoutes.get('/', adaptExpressRoute(makeListExchangesController()));

export { exchangesRoutes };
