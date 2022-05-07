import { PublishRequest } from '@application/useCases/publish-request';
import { makeRabbitMQ } from '../providers/rabbitmq.factory';

export function makePublishRequest(queue: string) {
  const broker = makeRabbitMQ();

  return new PublishRequest(broker, queue);
}
