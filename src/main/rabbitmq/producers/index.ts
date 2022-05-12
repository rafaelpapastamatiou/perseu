import { setupRabbitMQ } from '@infra/rabbitmq/rabbitmq';

async function setup() {
  await setupRabbitMQ();

  await import('./twelvedata-schedules');
}

setup();
