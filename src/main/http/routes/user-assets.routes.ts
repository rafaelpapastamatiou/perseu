import { ListUserAssetsRequestDTO } from '@presentation/http/dtos/list-user-assets.dto';
import { ValidationMiddleware } from '@presentation/http/middlewares/validation.middleware';
import { Router } from 'express';
import { adaptExpressMiddleware } from '../adapters/express-middleware.adapter';
import { adaptExpressRoute } from '../adapters/express-route.adapter';
import { makeListUserAssetsController } from '../factories/controllers/userAssets/list-user-assets.controller.factory';

const userAssetsRoutes = Router();

userAssetsRoutes.get(
  '/',
  adaptExpressMiddleware(new ValidationMiddleware(ListUserAssetsRequestDTO)),
  adaptExpressRoute(makeListUserAssetsController()),
);

export { userAssetsRoutes };
