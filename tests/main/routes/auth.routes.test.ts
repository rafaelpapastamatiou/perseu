import request from 'supertest';
import { Express } from 'express';

import {
  connectMongoMemoryServer,
  clearMongoMemoryServer,
  disconnectMongoMemoryServer,
} from '@tests/infra/providers/database/mongodb/setupMongo';
import { setupApp } from '@main/http/app';

let app: Express;

describe('Auth Routes', () => {
  beforeAll(async () => {
    app = await setupApp();
    await connectMongoMemoryServer();
  });

  beforeEach(async () => {
    await clearMongoMemoryServer();
  });

  afterAll(async () => {
    await disconnectMongoMemoryServer();
  });

  describe('POST /signup', () => {
    it('should return 200 on signup', async () => {
      await request(app)
        .post('/signup')
        .send({
          firstName: 'fake',
          lastName: 'user',
          email: 'fakeuser@email.com',
          password: '123456',
        })
        .expect(200);

      await request(app)
        .post('/signup')
        .send({
          firstName: 'fake',
          lastName: 'user',
          email: 'fakeuser@email.com',
          password: '123456',
        })
        .expect(400);
    });
  });
});
