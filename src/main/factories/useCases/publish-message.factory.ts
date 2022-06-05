import { PublishMessage } from '@application/useCases/publish-message';
import { makeRabbitMQ } from '../providers/rabbitmq.factory';

export function makePublishMessage(queue: string) {
  const broker = makeRabbitMQ();

  return new PublishMessage(broker, queue);
}
