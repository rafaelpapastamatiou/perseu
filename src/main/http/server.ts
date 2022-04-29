import { setupApp } from './app';

async function startServer() {
  try {
    const app = await setupApp();

    const port = process.env.PORT || 4000;

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
