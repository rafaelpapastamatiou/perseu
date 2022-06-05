import { Broker } from '@application/providers/broker/broker';
import { QueueMessage } from '@application/providers/broker/consume-from-queue';
import { UseCase } from '@domain/interfaces/use-case';

export type PublishMessageInterface = UseCase<[any], PublishMessageResult>;

export class PublishMessage implements PublishMessageInterface {
  constructor(private broker: Broker, private queue: string) {}

  async execute(message: QueueMessage): Promise<PublishMessageResult> {
    await this.broker.connect();

    const isPublished = await this.broker.publish({
      queue: this.queue,
      message: JSON.stringify(message),
    });

    if (!isPublished) return { success: false };

    return { success: true };
  }
}

export type PublishMessageResult = {
  success: boolean;
};
