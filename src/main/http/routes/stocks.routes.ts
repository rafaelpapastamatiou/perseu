import { Router } from 'express';

import { adaptExpressRoute } from '@main/http/adapters/express-route.adapter';
import { makeAssetPriceController } from '../factories/controllers/asset-price.controller.factory';
import { adaptExpressMiddleware } from '../adapters/express-middleware.adapter';
import { StockPriceRequestDTO } from '@presentation/http/dtos/stock-price.dto';
import { ValidationMiddleware } from '@presentation/http/middlewares/validation.middleware';
import { StockInfoRequestDTO } from '@presentation/http/dtos/stock-info.dto';
import { makeStockInfoController } from '../factories/controllers/asset-info.controller.factory';

const stockRoutes = Router();

/**
 * GET /stocks/price
 * @summary Get stock current price
 * @tags Stocks
 * @param {string} symbol.query.required - Stock symbol
 * @param {string} exchange.query.required - Stock exchange
 * @return {number} 200 - Success - application/json
 * @example response - 200 success response example
 * 49.5
 */
stockRoutes.get(
  '/price',
  adaptExpressMiddleware(new ValidationMiddleware(StockPriceRequestDTO)),
  adaptExpressRoute(makeAssetPriceController()),
);

/**
 * Stock info type
 * @typedef {object} StockInfoResponse
 * @property {string} symbol.required - Stock symbol
 * @property {string} exchange.required - Stock exchange
 * @property {string} name.required - Stock name
 * @property {string} currency.required - Stock currency
 */

/**
 * GET /stocks/info
 * @summary Get stock info
 * @tags Stocks
 * @param {string} symbol.query.required - Stock symbol
 * @param {string} exchange.query.required - Stock exchange
 * @return {StockInfoResponse} 200 - Success - application/json
 * @example response - 200 Success response example
 * 49.5
 */
stockRoutes.get(
  '/info',
  adaptExpressMiddleware(new ValidationMiddleware(StockInfoRequestDTO)),
  adaptExpressRoute(makeStockInfoController()),
);

export { stockRoutes };
