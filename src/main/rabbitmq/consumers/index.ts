import { setupMongoose } from '@infra/database/mongodb/mongo-helper';
import { setupRabbitMQ } from '@infra/rabbitmq/rabbitmq';
import { setupRedisClient } from '@infra/redis';

async function setup() {
  await setupMongoose();
  await setupRedisClient();
  await setupRabbitMQ();

  await import('./twelvedata-consumer');
  await import('./internal-consumer');
}

setup();
