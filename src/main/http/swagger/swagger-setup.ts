import express, { Express } from 'express';
import * as swagger from 'swagger-express-ts';

export function setupSwagger(app: Express): void {
  app.use(
    swagger.express({
      path: '/docs/swagger.json',
      definition: {
        info: {
          title: 'Perseu API',
          version: '1.0',
        },
        externalDocs: {
          url: 'http://perseu.app',
        },
      },
    }),
  );

  app.use('/docs', express.static('src/main/http/swagger/index.html'));

  app.use(
    '/docs/swagger/assets',
    express.static('node_modules/swagger-ui-dist'),
  );
}
