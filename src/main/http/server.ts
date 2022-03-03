import mongoose from 'mongoose';

import { setupApp } from './app';

async function startServer() {
  const app = await setupApp();

  mongoose.connect(process.env.DATABASE_URL);

  mongoose.connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection error.'),
  );

  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB.');
    app.emit('ready');
  });

  const port = process.env.PORT || 3000;

  app.on('ready', () => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  });
}

startServer();
