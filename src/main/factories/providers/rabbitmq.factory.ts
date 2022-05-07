import { RabbitMQ } from '@infra/rabbitmq/rabbitmq';

export function makeRabbitMQ() {
  return new RabbitMQ();
}
