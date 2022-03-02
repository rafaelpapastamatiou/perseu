import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { router } from './routes';

const server = express();

server.use(express.json());
server.use(cors());
server.use(router);

mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error.'),
);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB.');
  server.emit('ready');
});

const port = process.env.PORT || 3000;

server.on('ready', () => {
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
