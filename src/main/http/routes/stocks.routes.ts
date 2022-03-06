import { Router } from 'express';

import { adaptExpressRoute } from '@main/http/adapters/express-route.adapter';
import { makeStockPriceController } from '../factories/controllers/stock-price.controller.factory';
import { adaptExpressMiddleware } from '../adapters/express-middleware.adapter';
import { GetStockPriceDTO } from '@presentation/http/dtos/get-stock-price.dto';
import { ValidationMiddleware } from '@presentation/http/middlewares/validation.middleware';
import { GetStockInfoDTO } from '@presentation/http/dtos/get-stock-info.dto';
import { makeStockInfoController } from '../factories/controllers/stock-info.controller.factory';

const stockRoutes = Router();

stockRoutes.get(
  '/price',
  adaptExpressMiddleware(new ValidationMiddleware(GetStockPriceDTO)),
  adaptExpressRoute(makeStockPriceController()),
);

stockRoutes.get(
  '/info',
  adaptExpressMiddleware(new ValidationMiddleware(GetStockInfoDTO)),
  adaptExpressRoute(makeStockInfoController()),
);

export { stockRoutes };
