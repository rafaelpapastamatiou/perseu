import { Router } from 'express';

import { adaptExpressRoute } from '@main/http/adapters/express-route.adapter';
import { makeAssetPriceController } from '../factories/controllers/asset-price.controller.factory';
import { adaptExpressMiddleware } from '../adapters/express-middleware.adapter';
import { StockPriceRequestDTO } from '@presentation/http/dtos/stock-price.dto';
import { ValidationMiddleware } from '@presentation/http/middlewares/validation.middleware';
import { StockInfoRequestDTO } from '@presentation/http/dtos/stock-info.dto';
import { makeStockInfoController } from '../factories/controllers/asset-info.controller.factory';
import { GetAssetProfileRequestDTO } from '@presentation/http/dtos/get-asset-profile.dto';
import { makeGetAssetProfileController } from '../factories/controllers/assets/get-asset-profile.controller.factory';

const assetsRoutes = Router();

/**
 * GET /assets/price
 * @summary Get asset current price
 * @tags Assets
 * @param {string} symbol.query.required - Asset symbol
 * @param {string} exchange.query.required - Asset exchange
 * @return {number} 200 - Success - application/json
 * @example response - 200 success response example
 * 49.5
 */
assetsRoutes.get(
  '/price',
  adaptExpressMiddleware(new ValidationMiddleware(StockPriceRequestDTO)),
  adaptExpressRoute(makeAssetPriceController()),
);

/**
 * Asset info type
 * @typedef {object} StockInfoResponse
 * @property {string} symbol.required - Asset symbol
 * @property {string} exchange.required - Asset exchange
 * @property {string} name.required - Asset name
 * @property {string} currency.required - Asset currency
 */

/**
 * GET /assets/info
 * @summary Get asset info
 * @tags Assets
 * @param {string} symbol.query.required - Asset symbol
 * @param {string} exchange.query.required - Asset exchange
 * @return {StockInfoResponse} 200 - Success - application/json
 * @example response - 200 Success response example
 * 49.5
 */
assetsRoutes.get(
  '/info',
  adaptExpressMiddleware(new ValidationMiddleware(StockInfoRequestDTO)),
  adaptExpressRoute(makeStockInfoController()),
);

assetsRoutes.get(
  '/profile',
  adaptExpressMiddleware(new ValidationMiddleware(GetAssetProfileRequestDTO)),
  adaptExpressRoute(makeGetAssetProfileController()),
);

export { assetsRoutes };
