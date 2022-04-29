import { Router } from 'express';

import { adaptExpressRoute } from '@main/http/adapters/express-route.adapter';
import { adaptExpressMiddleware } from '../adapters/express-middleware.adapter';
import { ValidationMiddleware } from '@presentation/http/middlewares/validation.middleware';
import { CreateTransactionDTO } from '@presentation/http/dtos/create-transaction.dto';
import { UpdateTransactionDTO } from '@presentation/http/dtos/update-transaction.dto';
import { makeTransactionCreationController } from '../factories/controllers/transaction-creation.controller.factory';
import { makeListTransactionsController } from '../factories/controllers/transactions/list-transactions.controller.factory';

const transactionsRoutes = Router();

transactionsRoutes.post(
  '/',
  adaptExpressMiddleware(new ValidationMiddleware(CreateTransactionDTO)),
  adaptExpressRoute(makeTransactionCreationController()),
);

// transactionsRoutes.put(
//   '/transactions/:id',
//   adaptExpressMiddleware(new ValidationMiddleware(UpdateTransactionDTO)),
//   adaptExpressRoute(),
// );

transactionsRoutes.get(
  '/',
  adaptExpressRoute(makeListTransactionsController()),
);

export { transactionsRoutes };
