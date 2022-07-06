import request from 'supertest';
import { Express } from 'express';
import mongoose, { Collection } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import {
  connectMongoMemoryServer,
  clearMongoMemoryServer,
  disconnectMongoMemoryServer,
} from '@tests/infra/providers/database/mongodb/setupMongo';
import { setupApp } from '@main/http/app';

let app: Express;
let usersCollection: Collection;

describe('Auth Routes', () => {
  beforeAll(async () => {
    app = await setupApp();
    await connectMongoMemoryServer();
  });

  beforeEach(async () => {
    await clearMongoMemoryServer();
    usersCollection = mongoose.connection.collection('users');
  });

  afterAll(async () => {
    await disconnectMongoMemoryServer();
  });

  describe('POST /signup', () => {
    it('should return 200 if user created with success', async () => {
      await request(app)
        .post('/signup')
        .send({
          firstName: 'fake',
          lastName: 'user',
          email: 'fakeuser@email.com',
          password: '123456',
        })
        .expect(200);
    });

    it('should return 400 if email already in use', async () => {
      const password = await bcrypt.hash('123456', 10);

      await usersCollection.insertOne({
        firstName: 'fake',
        lastName: 'user',
        email: 'fakeuser@email.com',
        password,
      });

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

  describe('POST /signin', () => {
    it('should return 200 if provided credentials are valid', async () => {
      const password = await bcrypt.hash('123456', 10);

      await usersCollection.insertOne({
        firstName: 'fake',
        lastName: 'user',
        email: 'fakeuser@email.com',
        password,
      });

      await request(app)
        .post('/signin')
        .send({
          firstName: 'fake',
          lastName: 'user',
          email: 'fakeuser@email.com',
          password: '123456',
        })
        .expect(200);
    });

    it('should return 401 if provided credentials are invalid', async () => {
      await request(app)
        .post('/signin')
        .send({
          firstName: 'fake',
          lastName: 'user',
          email: 'fakeuser@email.com',
          password: '123456',
        })
        .expect(401);
    });
  });
});
