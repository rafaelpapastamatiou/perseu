import { Broker } from '@application/providers/broker/broker';
import { UseCase } from '@domain/interfaces/use-case';

export type PublishRequestInterface = UseCase<[any], PublishRequestResult>;

export class PublishRequest implements PublishRequestInterface {
  constructor(private broker: Broker, private queue: string) {}

  async execute<T>(params: T): Promise<PublishRequestResult> {
    await this.broker.connect();

    const isPublished = await this.broker.publish({
      queue: this.queue,
      message: JSON.stringify(params),
    });

    if (!isPublished) return { success: false };

    return { success: true };
  }
}

export type PublishRequestResult = {
  success: boolean;
};
