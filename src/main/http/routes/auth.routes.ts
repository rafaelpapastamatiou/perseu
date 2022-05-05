import { Router } from 'express';

import { adaptExpressRoute } from '@main/http/adapters/express-route.adapter';
import { adaptExpressMiddleware } from '@main/http/adapters/express-middleware.adapter';
import { makeSignUpController } from '@main/http/factories/controllers/signup.controller.factory';
import { SignUpRequestDTO } from '@presentation/http/dtos/signup.dto';
import { ValidationMiddleware } from '@presentation/http/middlewares/validation.middleware';
import { SignInRequestDTO } from '@presentation/http/dtos/signin.dto';
import { makeSignInController } from '../factories/controllers/signin.controller.factory';

const authRoutes = Router();

/**
 * User type
 * @typedef {object} User
 * @property {string} id.required - User id
 * @property {string} email.required - User e-mail
 * @property {string} firstName.required - User first name
 * @property {string} lastName.required - User last name
 */

/**
 * Sign in request body type
 * @typedef {object} SignInRequest
 * @property {string} email.required - User email
 * @property {string} password.required - User password
 */

/**
 * Stock info type
 * @typedef {object} SignInResponse
 * @property {string} accessToken.required - Access token
 * @property {User} user - User
 */

/**
 * POST /signin
 * @summary Sign in
 * @tags Auth
 * @param {SignInRequest} request.body.required
 * @return {SignInResponse} 200 - Success - application/json
 * @example response - 200 success response example
 * 49.5
 */

authRoutes.post(
  '/signin',
  adaptExpressMiddleware(new ValidationMiddleware(SignInRequestDTO)),
  adaptExpressRoute(makeSignInController()),
);

/**
 * Sign up request body type
 * @typedef {object} SignUpRequest
 * @property {string} email.required - User email
 * @property {string} password.required - User password
 * @property {string} firstName.required - User first name
 * @property {string} lastName.required - User last name
 */

/**
 * POST /signup
 * @summary Sign up
 * @tags Auth
 * @param {SignUpRequest} request.body.required
 * @return {SignInResponse} 200 - Success - application/json
 * @example response - 200 success response example
 * 49.5
 */
authRoutes.post(
  '/signup',
  adaptExpressMiddleware(new ValidationMiddleware(SignUpRequestDTO)),
  adaptExpressRoute(makeSignUpController()),
);

export { authRoutes };
