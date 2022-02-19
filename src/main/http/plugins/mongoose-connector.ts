import { FastifyPluginCallback } from 'fastify';
import * as mongoose from 'mongoose';

export const mongooseConnector: FastifyPluginCallback = (
  _fastify,
  _options,
  done,
) => {
  mongoose.connect(process.env.DATABASE_URL);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error.'));

  db.once('open', () => {
    console.log('Connected to MongoDB.');
    done();
  });
};
