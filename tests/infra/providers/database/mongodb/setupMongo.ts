import mongoose from 'mongoose';

import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = new MongoMemoryServer();

export async function connectMongoMemoryServer() {
  await mongoServer.start();

  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
}

export async function disconnectMongoMemoryServer() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
}

export async function clearMongoMemoryServer() {
  if (mongoServer.state !== 'running') {
    return;
  }

  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
}
