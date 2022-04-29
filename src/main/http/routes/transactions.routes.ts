import { Router } from 'express';

import { adaptExpressRoute } from '@main/http/adapters/express-route.adapter';
import { adaptExpressMiddleware } from '../adapters/express-middleware.adapter';
import { ValidationMiddleware } from '@presentation/http/middlewares/validation.middleware';
import { CreateTransactionRequestDTO } from '@presentation/http/dtos/create-transaction.dto';
import { makeCreateTransactionController } from '../factories/controllers/transactions/create-transaction.controller.factory';
import { makeListTransactionsController } from '../factories/controllers/transactions/list-transactions.controller.factory';
import { makeUpdateTransactionController } from '../factories/controllers/transactions/update-transaction.controller.factory';
import { UpdateTransactionDTO } from '@presentation/http/dtos/update-transaction.dto';

const transactionsRoutes = Router();

/**
 * Transaction type
 * @typedef {object} Transaction
 * @property {string} id.required - Transaction id
 * @property {string} type.required - Transaction type - enum:purchase,sale
 * @property {string} symbol.required - Transaction asset symbol
 * @property {string} exchange.required - Transaction asset exchange
 * @property {number} quantity.required - Transaction asset quantity
 * @property {string} unitValue.required - Transaction asset unit value
 * @property {string} date.required - Transaction date
 */

/**
 * Create transaction payload
 * @typedef {object} CreateTransactionRequest
 * @property {string} type.required - Transaction type
 * @property {string} symbol.required - Transaction asset symbol
 * @property {string} exchange.required - Transaction asset exchange
 * @property {number} quantity.required - Transaction asset quantity
 * @property {string} unitValue.required - Transaction asset unit value
 * @property {string} date.required - Transaction date
 */

/**
 * POST /transactions
 * @summary Create transaction
 * @tags Transactions
 * @param {CreateTransactionRequest} request.body.required
 * @return {Transaction} 200 - Success - application/json
 * @example response - 200 success response example
 */
transactionsRoutes.post(
  '/',
  adaptExpressMiddleware(new ValidationMiddleware(CreateTransactionRequestDTO)),
  adaptExpressRoute(makeCreateTransactionController()),
);

/**
 * Update transaction payload
 * @typedef {object} UpdateTransactionRequest
 * @property {number} quantity - New transaction asset quantity
 * @property {number} unitValue - New transaction asset unit value
 * @property {string} type - New transaction type - enum:purchase,sale
 */

/**
 * PUT /transactions/{id}
 * @summary Update transaction
 * @tags Transactions
 * @param {string} id.path - transaction id
 * @param {UpdateTransactionRequest} request.body.required
 * @return {Transaction} 200 - Success - application/json
 * @example response - 200 success response example
 */
transactionsRoutes.put(
  '/transactions/:id',
  adaptExpressMiddleware(new ValidationMiddleware(UpdateTransactionDTO)),
  adaptExpressRoute(makeUpdateTransactionController()),
);

/**
 * GET /transactions
 * @summary List transactions
 * @tags Transactions
 * @return {array<Transaction>} 200 - Success - application/json
 * @example response - 200 success response example
 */
transactionsRoutes.get(
  '/',
  adaptExpressRoute(makeListTransactionsController()),
);

export { transactionsRoutes };
